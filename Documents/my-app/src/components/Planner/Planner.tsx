import React, { useState } from "react";
import { Calendar, Row, Col, Card, Typography } from "antd";
import type { Dayjs } from "dayjs";
import styles from "./Planner.module.scss";

const { Title } = Typography;

interface PlannerProps {
  embedded?: boolean;
}

const Planner: React.FC<PlannerProps> = ({ embedded = false }) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const onSelect = (value: Dayjs) => {
    setSelectedDate(value);
  };

  return (
    <div
      className={`${styles.plannerContainer} ${embedded ? styles.embedded : ""}`}
    >
      <Row gutter={[16, 16]} justify={embedded ? "start" : "center"}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card className={styles.plannerCalendar}>
            <Title level={4}>Planner Calendar</Title>
            <Calendar fullscreen={false} onSelect={onSelect} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Planner;
