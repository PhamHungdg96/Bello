import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import Sidebar from "./Sidebar";
import '../styles/home.css';
import { Card,Row, Input, Tabs, Button, Typography} from 'antd';
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

  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("board");

  const handleTabChange = (activeKey) => {
    setActiveTab(activeKey);
  }
  
  return (
    <div className='home-container'>
      {windowSize[0] >= 768 && (
        <Sidebar
          setIsBoardModalOpen={setIsBoardModalOpen}
          isBoardModalOpen={isBoardModalOpen}
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
      )}

      {/* Columns Section */}
      <div style={{ flexGrow: 1 }}>
          <Tabs activeKey={activeTab} onChange={handleTabChange}>
            <TabPane tab="Overview" key="overview" />
            <TabPane tab="List" key="list" />
            <TabPane tab="Board" key="board" />
            <TabPane tab="TimeLine" key="timeline" />
            <TabPane tab="Calendar" key="calendar" />
            <TabPane tab="Workflow" key="workflow" />
            <TabPane tab="Dashboard" key="dashboard" />
          </Tabs>
          {activeTab === "overview" && (
            <Typography component="div" style={{ padding: '1rem' }}>
              Tab 0 Content
            </Typography>
          )}
          {activeTab === "list" && (
            <Typography component="div" style={{ padding: '1rem' }}>
              Tab 1 Content
            </Typography>
          )}
          {activeTab ==="board" && (
            <div className="board-sections">
              {columns.length > 0 ? (
                  <>
                    {columns.map((col, index) => (
                      <Column key={index} colIndex={index} />
                    ))}
                    <div
                      onClick={() => {
                        setIsBoardModalOpen(true);
                      }}
                      className="add-column"
                    >
                      + New Column
                    </div>
                  </>
                ) : (
                  <>
                    <EmptyBoard type="edit" />
                  </>
                )}
                {isBoardModalOpen && (
                  <AddEditBoardModal
                    type="edit"
                    setIsBoardModalOpen={setIsBoardModalOpen}
                  />
                )}
            </div>
       
          )}
          {activeTab === "timeline" && (
            <Typography component="div" style={{ padding: '1rem' }}>
              Tab 3 Content
            </Typography>
          )}
          {activeTab === "calendar" && (
            <Typography component="div" style={{ padding: '1rem' }}>
              Tab 4 Content
            </Typography>
          )}
          {activeTab === "workflow" && (
            <Typography component="div" style={{ padding: '1rem' }}>
              Tab 5 Content
            </Typography>
          )}
          {activeTab === "dashboard" && (
            <Typography component="div" style={{ padding: '1rem' }}>
              Tab 6 Content
            </Typography>
          )}
      </div>      
    </div>
  );
}

export default Home;
