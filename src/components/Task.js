import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskModal from "../modals/TaskModal";
import { AntDesignOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Badge, Space, Card } from 'antd';
function Task({ colIndex, taskIndex }) {
  const boards = useSelector((state) => state.boards);
  const [show, setShow] = useState(true);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(startDate.getDate() + 7);


  let completed = 0;
  let subtasks = task.subtasks;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };

  return (
    <div>
      <div
        onClick={() => {
          setIsTaskModalOpen(true);
        }}
        draggable
        onDragStart={handleOnDrag}
        className=" w-[280px] first:my-5 rounded-lg  bg-white  dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#635fc7] dark:text-white dark:hover:text-[#635fc7] cursor-pointer "
      >
            <Badge.Ribbon text={<p> {completed}/{subtasks.length} completed</p> } color={completed == subtasks.length ? "green" : "purple"} style={{top: '-24px',right: '-18px'}}></Badge.Ribbon>
            <p className=" font-bold tracking-wide ">{task.title}</p>
        <div className="mt-[10px] flex">
          <Space>
              <Badge count={show ? 'Medium' : ""} showZero color='#faad14' style={{border: 'none', fontWeight: '400'}}/>
              <Badge count={show ? "High" : ""} />
              <Badge className="site-badge-count-109" count={show ? "Low" : ""} style={{ backgroundColor: '#52c41a' }}/>
          </Space>
        </div>
        <div className="mt-[10px] flex justify-end">
            <div className="flex-1">
            <Avatar.Group>
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" className="w-[25px] h-[25px]"/>
              <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} className="w-[25px] h-[25px]" />
            </Avatar.Group>
            </div>
            <div  className="font-bold text-xs tracking-tighter mt-2 text-gray-500"> 
            {startDate && endDate && (
            <p>
                {new Date(startDate).toDateString()} - {new Date(endDate).toDateString()}
              </p>
            )}
            </div>
        </div>
       
        {/* <p className=" font-bold text-xs tracking-tighter mt-2 text-gray-500">
          {completed} of {subtasks.length} completed tasks
        </p> */}
      </div>
      {isTaskModalOpen && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </div>
  );
}

export default Task;
