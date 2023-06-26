import React, { useState } from "react";
import { Input, Button, Card, Typography, Row } from "antd";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";

import "./CustomInput.css";

interface CustomInputProps {
  text: string;
  onSubmit: (value: string) => void;
  displayClass?: string;
  editClass?: string;
  placeholder?: string;
  defaultValue?: string;
  buttonText?: string;
}

function CustomInput(props: CustomInputProps) {
  const {
    text,
    onSubmit,
    displayClass,
    editClass,
    placeholder,
    defaultValue,
    buttonText,
  } = props;
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [inputText, setInputText] = useState(defaultValue || "");

  const submission = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText && onSubmit) {
      setInputText("");
      onSubmit(inputText);
    }
    setIsCustomInput(false);
  };

  return (
    <Card className=".custom-input">
      <Row justify="center" align="middle">
      {isCustomInput ? (
        <form
          className={`custom-input-edit ${editClass ? editClass : ""}`}
          onSubmit={submission}
        >
          <Input
            value={inputText}
            placeholder={placeholder || text}
            onChange={(event) => setInputText(event.target.value)}
            autoFocus
          />
          <Card className="custom-input-edit-footer">
            <Button type="primary" htmlType="submit">
              {buttonText || "Add"}
            </Button>
            <CloseOutlined
              onClick={() => setIsCustomInput(false)}
              className="closeIcon"
            />
          </Card>
        </form>
      ) : (
        <Typography.Text
          className={`custom-input-display ${displayClass ? displayClass : ""}`}
          onClick={() => setIsCustomInput(true)}
        >
          {text}
          <EditOutlined className="editIcon" />
        </Typography.Text>
      )}
      </Row>
    </Card>
  );
}

export default CustomInput;
