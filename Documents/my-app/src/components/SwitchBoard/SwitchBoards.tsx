import React, { useState } from "react";
import { Modal, Input, Button, Card, Tabs, Tooltip } from "antd";
import { ClockCircleOutlined, DownOutlined, AppstoreOutlined, PushpinOutlined, PlusOutlined, MoreOutlined } from "@ant-design/icons";
import "./SwitchBoards.scss";
import { LocalStorage } from "../../Utils/LocalStorage";

interface SwitchBoardsProps {
  open: boolean;
  onClose: () => void;
}

const SwitchBoards: React.FC<SwitchBoardsProps> = ({ open, onClose }) => {
  const [hoverRecent, setHoverRecent] = useState(false);
  const [hoverWorkspace, setHoverWorkspace] = useState(false);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={false}
      centered
      width={520}
      className="switch-boards-modal"
    >
      {/* Header: Search + actions */}
      <div className="switch-header">
        <Input.Search placeholder="Search your boards" allowClear />
        <div className="switch-actions">
          <Button icon={<AppstoreOutlined />} />
          <Button icon={<PushpinOutlined />} />
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        defaultActiveKey="1"
        items={[
          { key: "1", label: "All" },
          { key: "2", label: "Trello Workspace" },
        ]}
      />

      {/* Recent Section */}
      <div
        className="section-header"
        onMouseEnter={() => setHoverRecent(true)}
        onMouseLeave={() => setHoverRecent(false)}
      >
        <span className="icon">{hoverRecent ? <DownOutlined /> : <ClockCircleOutlined />}</span>
        <span className="label">Recent</span>
      </div>

      {/* Recent Board Card */}
      <Card className="board-card">
  <div className="board-thumbnail" />
  <div className="board-title">
    {LocalStorage.getItem("boardName") || "My Trello board"}
  </div>
</Card>

      {/* Trello Workspace Section */}
      <div
        className="section-header"
        onMouseEnter={() => setHoverWorkspace(true)}
        onMouseLeave={() => setHoverWorkspace(false)}
      >
        <span className="label">Trello Workspace</span>
        {hoverWorkspace && (
          <div className="actions">
            <Tooltip title="Create board">
              <Button size="small" type="text" icon={<PlusOutlined />} />
            </Tooltip>
            <Tooltip title="More options">
              <Button size="small" type="text" icon={<MoreOutlined />} />
            </Tooltip>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SwitchBoards;
