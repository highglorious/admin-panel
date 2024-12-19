import React, { useState, useRef } from "react";
import { Card, Row, Col, Typography, Upload, Button, message } from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import Flex from "components/shared-components/Flex";

import useImage from "use-image";
import chair from "assets/img/chair.png";
import table from "assets/img/table.png";
import sofa from "assets/img/sofa.png";
import angled from "assets/img/angled.png";

const { Title } = Typography;

const elementImages = [
  { id: 1, name: "Chair", src: chair },
  { id: 2, name: "Table", src: table },
  { id: 3, name: "Sofa", src: sofa },
  { id: 4, name: "AngleSofa", src: angled },
];

const PlanElement = ({ src, x, y, isDragging, onDragStart, onDragEnd }) => {
  const [img] = useImage(src);
  return (
    <KonvaImage
      image={img}
      x={x}
      y={y}
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
      draggable
      opacity={isDragging ? 0.5 : 1}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    />
  );
};

const initPlanElements = [];

const Planner = () => {
  const dragUrl = useRef();
  const stageRef = useRef();

  const [planElements, setPlanElements] = useState(initPlanElements);

  const handleDragStart = (e) => {
    const id = e.target.id();
    setPlanElements(
      planElements.map((elem) => {
        return {
          ...elem,
          isDragging: elem.id === id,
        };
      })
    );
  };

  const handleDragEnd = () => {
    setPlanElements(
      planElements.map((elem) => {
        return {
          ...elem,
          isDragging: false,
        };
      })
    );
  };

  const onFileUpload = (info) => {
    const { file } = info;

    if (file.status === "done" || file.status === "uploading") {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          setPlanElements(json);
          message.success("Uploaded!");
        } catch (error) {
          message.error("Invalid file!");
        }
      };

      reader.readAsText(file.originFileObj);
    }
  };

  const onFileSave = () => {
    console.log(planElements);

    const jsonString = JSON.stringify(planElements, null, 2);

    const blob = new Blob([jsonString], { type: "application/json" });
    const fileUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "planner-settings.json";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(fileUrl);
  };

  return (
    <Row gutter={16} className="p-2">
      <Col span={12}>
        <Card title={<Title level={4}>Elements List</Title>}>
          <Flex
            alignItems="center"
            justifyContent="start"
            className="text-center text-md-left flex-wrap"
          >
            {/* <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}> */}
            {elementImages.map((elem) => (
              <img
                key={elem.id}
                src={elem.src}
                alt={elem.name}
                draggable
                onDragStart={(e) => {
                  dragUrl.current = e.target.src;
                }}
                className="border rounded p-1 m-2 "
                style={{
                  width: "100px",
                  height: "100px",
                  cursor: "grab",
                }}
              />
            ))}
          </Flex>
          {/* </div> */}
        </Card>
        <Card title={<Title level={4}>Settings</Title>}>
          <div>
            <Upload onChange={onFileUpload} showUploadList={false}>
              <Button icon={<UploadOutlined />} type="primary">
                Load
              </Button>
            </Upload>
            <Button
              icon={<DownloadOutlined />}
              className="ml-2"
              onClick={onFileSave}
            >
              Save
            </Button>
          </div>
        </Card>
      </Col>

      <Col span={12}>
        <Card title={<Title level={4}>Design Map</Title>}>
          <div
            className="border rounded bg-gray-lighter"
            style={{
              width: "100%",
              height: "600px",
              overflow: "hidden",
            }}
            onDrop={(e) => {
              e.preventDefault();

              stageRef.current.setPointersPositions(e);

              setPlanElements(
                planElements.concat([
                  {
                    key: `key-${Date.now()}`,
                    ...stageRef.current.getPointerPosition(),
                    src: dragUrl.current,
                  },
                ])
              );
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <Stage
              width={window.innerWidth}
              height={window.innerHeight}
              ref={stageRef}
            >
              <Layer>
                {planElements.map((elem) => (
                  <PlanElement
                    key={elem.key}
                    src={elem.src}
                    x={elem.x}
                    y={elem.y}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                ))}
              </Layer>
            </Stage>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Planner;
