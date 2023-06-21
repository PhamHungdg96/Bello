import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import Sidebar from "./Sidebar";
import { Card,Row, Input, Tabs, Button, Typography} from 'antd';
import { DeleteOutlined, StarOutlined, StarTwoTone } from '@ant-design/icons';
import "../styles/home.css"

const { TabPane } = Tabs;
function Home() {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });
  const [activeTab, setActiveTab] = useState("board");

  const handleTabChange = (activeKey) => {
    setActiveTab(activeKey);
  }
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <div className="content-container">
    <div className={
        windowSize[0] >= 768 && isSideBarOpen
          ? " bg-[#f4f7fd] flex dark:bg-[#20212c] gap-6 ml-[301px]"
          : "bg-[#f4f7fd] flex dark:bg-[#20212c] gap-6 ml-[70px]"
      }>
     <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab={<span className="tab-label">Overview</span>} key="overview" />
        <TabPane tab={<span className="tab-label">List</span>} key="list" />
        <TabPane tab={<span className="tab-label">Board</span>} key="board" />
        <TabPane tab={<span className="tab-label">TimeLine</span>} key="timeline" />
        <TabPane tab={<span className="tab-label">Calendar</span>} key="calendar" />
        <TabPane tab={<span className="tab-label">Workflow</span>} key="workflow" />
        <TabPane tab={<span className="tab-label">Dashboard</span>} key="dashboard" />
    </Tabs>
    </div>
    <div
      className={
        windowSize[0] >= 768 && isSideBarOpen
          ? " bg-[#f4f7fd] scrollbar-hide  flex dark:bg-[#20212c] overflow-x-scroll gap-6 ml-[261px]"
          : "bg-[#f4f7fd] scrollbar-hide flex dark:bg-[#20212c] overflow-x-scroll gap-6 "
      }
    >
      {windowSize[0] >= 768 && (
        <Sidebar
          setIsBoardModalOpen={setIsBoardModalOpen}
          isBoardModalOpen={isBoardModalOpen}
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
      )}
     
      <div>
          {/* Columns Section */}
          {activeTab === "overview" && (
            <Typography component="div" style={{ padding: '1rem' , height: '100vh'}}>
              Tab 0 Content
            </Typography>
          )}
          {activeTab === "list" && (
            <Typography component="div" style={{ padding: '1rem', height: '100vh' }}>
              Tab 1 Content
            </Typography>
          )}
          {activeTab ==="board" && (
            <div className="scroll-container">
            {columns.length > 0 ? (
              <>
                {columns.map((col, index) => (
                  <Column key={index} colIndex={index}/>
                ))}
                <div
                  onClick={() => {
                    setIsBoardModalOpen(true);
                  }}
                  className=" dark:bg-[#2b2c3740] flex justify-center items-center font-bold text-2xl hover:text-[#635FC7] transition duration-300 cursor-pointer bg-[#E9EFFA] scrollbar-hide mb-2   mx-5 pt-[90px] min-w-[280px] text-[#828FA3] mt-[135px] rounded-lg "
                >
                  + New Column
                </div>
              </>
            ) : (
              <>
                <EmptyBoard type="edit" />
              </>
            )}
          </div>
       
          )}
          {activeTab === "timeline" && (
            <Typography component="div" style={{ padding: '1rem' , height: '100vh'}}>
              Tab 3 Content
            </Typography>
          )}
          {activeTab === "calendar" && (
            <Typography component="div" style={{ padding: '1rem' , height: '100vh'}}>
              Tab 4 Content
            </Typography>
          )}
          {activeTab === "workflow" && (
            <Typography component="div" style={{ padding: '1rem', height: '100vh' }}>
              Tab 5 Content
            </Typography>
          )}
          {activeTab === "dashboard" && (
            <Typography component="div" style={{ padding: '1rem' , height: '100vh'}}>
              Tab 6 Content
            </Typography>
          )}
      </div>

            
     
      {isBoardModalOpen && (
        <AddEditBoardModal
          type="edit"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
    </div>
  );
}

export default Home;