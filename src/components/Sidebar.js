import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import boardIcon from "../assets/icon-board.svg";
import useDarkMode from "../hooks/useDarkMode";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";

import showSidebarIcon from "../assets/icon-show-sidebar.svg";
import hideSidebarIcon from "../assets/icon-hide-sidebar.svg";
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import {Tooltip, Avatar, Space} from 'antd';
import boardsSlice from "../redux/boardsSlice";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import {CaretDownOutlined, CaretUpOutlined, HomeOutlined, QuestionCircleTwoTone,AppstoreOutlined, AppstoreAddOutlined,
        CheckCircleOutlined, MessageOutlined, UsergroupAddOutlined, ReconciliationOutlined, MenuFoldOutlined , MenuUnfoldOutlined,
        IdcardOutlined , TrophyOutlined} from '@ant-design/icons'
import {Drawer} from 'antd'
function Sidebar({ isSideBarOpen, setIsSideBarOpen }) {
  const dispatch = useDispatch();
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const boards = useSelector((state) => state.boards);

  const toggleSidebar = () => {
    setIsSideBarOpen((curr) => !curr);
  };
  const [showDiv, setShowDiv] = useState(false);

  function showProjects() {
    setShowDiv(!showDiv);
  }
  const [activeButton, setActiveButton] = useState('');

  // const handleClick = (buttonId) => {
  //   setActiveButton(buttonId);
  //   console.log(activeButton)
  // };
  const [open, setOpen] = useState(false);

  const showHelper = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div >
      <Drawer
                title="Help & Getting Started"
                placement="right"
                closable={false}
                onClose={onClose}
                open={open}
                getContainer={false}
                // style={{backgroundColor: '#2b2c37', opacity: 0.9, color: '#fff'}}
              >
                <p>Some contents...</p>
      </Drawer>
      
      <div
        className={
          isSideBarOpen
            ? `min-w-[261px] bg-white dark:bg-[#2b2c37] h-screen fixed top-[72px] scrollbar-hide h-screen overflow-x-scroll items-center left-0 z-20 menu-container`
            : ` bg-[#635FC7] dark:bg-[#2b2c37] dark:hover:bg-[#635FC7] top-[72px] scrollbar-hide overflow-x-scroll justify-center items-center hover:cursor-pointer  p-0 transition duration-300 transform fixed felx`
        }
       
      >
        {/* Sidebar hide/show toggle */}
   
        {isSideBarOpen ? (
          <div>
            <hr></hr>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }} onClick={() => toggleSidebar()} className="dark:bg-[#2b2c37] dark:hover:bg-[#635FC7]">
                {isSideBarOpen && <MenuFoldOutlined style={{ marginRight: '10px', fontSize: '25px', color: '#fff', padding: '10px',}}/>}
            </div>
            <hr></hr>
          </div>
        
          ) : (
            <div onClick={() => toggleSidebar()}>
              <MenuUnfoldOutlined style={{ marginRight: '10px', fontSize: '25px', padding: '10px', paddingRight: '0',color: '#fff' }}/>
            </div>
          )}
        <div>
          
          {/* reWrite modal  */}
          {isSideBarOpen && (
            <div className=" bg-white  dark:bg-[#2b2c37]    w-full   py-4 rounded-xl">
              
              <h4 className={` flex items-baseline space-x-2 px-5 mr-0 rounded-r-full duration-300 ease-in-out py-2 cursor-pointer hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white dark:hover:text-[#635fc7] dark:text-white
              ${ activeButton === 'button-home' && " bg-[#635fc7] rounded-r-full text-white mr-8 "}`} onClick={() => setActiveButton('button-home')}>
                <button style={{ display: 'flex', alignItems: 'center'}} >
                  <HomeOutlined style={{ marginRight: '10px', fontSize: '25px' }} />
                  Home
                </button>
              </h4>
              <h4 className={` flex items-baseline space-x-2 px-5 mr-0 rounded-r-full duration-300 ease-in-out py-2 cursor-pointer hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white dark:hover:text-[#635fc7] dark:text-white 
              ${ activeButton==='button-tasks' && " bg-[#635fc7] rounded-r-full text-white mr-8 "}`}  onClick={() => setActiveButton('button-tasks')}>
                <button style={{ display: 'flex', alignItems: 'center'}} >
                  <CheckCircleOutlined style={{ marginRight: '10px', fontSize: '25px' }} />
                  My Tasks
                </button>
              </h4>
              <h4 className={` flex items-baseline space-x-2 px-5 mr-0 rounded-r-full duration-300 ease-in-out py-2 cursor-pointer hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white dark:hover:text-[#635fc7] dark:text-white 
              ${ activeButton==='button-inbox' && " bg-[#635fc7] rounded-r-full text-white mr-8 "}`}  onClick={() => setActiveButton('button-inbox')}>
                <button style={{ display: 'flex', alignItems: 'center'}} >
                  <MessageOutlined style={{ marginRight: '10px', fontSize: '25px' }} />
                  Inbox
                </button>
              </h4>
              <h4 className={` flex items-baseline space-x-2 px-5 mr-0 rounded-r-full duration-300 ease-in-out py-2 cursor-pointer hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white dark:hover:text-[#635fc7] dark:text-white 
              ${ activeButton==='button-report' && " bg-[#635fc7] rounded-r-full text-white mr-8 "}`}  onClick={() => setActiveButton('button-report')}>
                <button style={{ display: 'flex', alignItems: 'center'}} >
                  <ReconciliationOutlined style={{ marginRight: '10px', fontSize: '25px' }} />
                  Report
                </button>
              </h4>
              <h4 className={` flex items-baseline space-x-2 px-5 mr-0 rounded-r-full duration-300 ease-in-out py-2 cursor-pointer hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white dark:hover:text-[#635fc7] dark:text-white 
              ${ activeButton==='button-portfolios' && " bg-[#635fc7] rounded-r-full text-white mr-8 "}`}  onClick={() => setActiveButton('button-portfolios')}>
                <button style={{ display: 'flex', alignItems: 'center'}} >
                  <IdcardOutlined style={{ marginRight: '10px', fontSize: '25px' }} />
                  Portfolios
                </button>
              </h4>
              <h4 className={` flex items-baseline space-x-2 px-5 mr-0 rounded-r-full duration-300 ease-in-out py-2 cursor-pointer hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white dark:hover:text-[#635fc7] dark:text-white 
              ${ activeButton==='button-goals' && " bg-[#635fc7] rounded-r-full text-white mr-8 "}`}  onClick={() => setActiveButton('button-goals')}>
                <button style={{ display: 'flex', alignItems: 'center'}} >
                  <TrophyOutlined style={{ marginRight: '10px', fontSize: '25px' }} />
                  Goals
                </button>
              </h4>
              <hr style={{ margin: '1.5rem 0', backgroundColor: 'gray' }} />
              <h4 className=" dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 ">
              <button onClick={showProjects} style={{ display: 'flex', alignItems: 'center' }}>
                
                {showDiv ? <CaretDownOutlined style={{ marginRight: '10px', fontSize: '25px' }} /> : <CaretUpOutlined style={{ marginRight: '10px', fontSize: '25px' }} />}
                Projects ({boards?.length})
              </button>

              </h4>
              {showDiv && 
              <div className="  dropdown-borad flex flex-coljustify-between ">
               
                <div>
                    <div className="flex items-baseline space-x-2 px-3 mr-2 mb-5 ml-5 pt-0 cursor-pointer">
                    <Avatar.Group>
                      <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
                      <Avatar src="https://freenice.net/wp-content/uploads/2021/08/hinh-anh-avatar-dep-639x600.jpg" />
                      <Avatar src="https://i.pinimg.com/236x/44/bf/4d/44bf4d17d985189dbfc909c99664123c.jpg" />
                      <a href="https://ant.design">
                        <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                      </a>
                      <Tooltip title="Ant User" placement="top">
                        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                      </Tooltip>
                      <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
                    </Avatar.Group>
                    </div>
                  {boards.map((board, index) => (
                    <div
                      className={` flex items-baseline space-x-2 px-5 mr-8 rounded-r-full duration-300 ease-in-out py-2 cursor-pointer hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white dark:hover:text-[#635fc7] dark:text-white  ${
                        board.isActive &&
                        " bg-[#635fc7] rounded-r-full text-white mr-8 "
                      } `}
                      key={index}
                      onClick={() => {
                        dispatch(boardsSlice.actions.setBoardActive({ index }));
                      }}
                    >
                     <AppstoreOutlined className="h-4" style={{fontSize: '25px', color: '#fff'}} />{" "}
                      <p className="">{board.name}</p>
                    </div>
                  ))}

                  <div
                    className=" flex  items-baseline space-x-2  mr-8 rounded-r-full duration-500 ease-in-out cursor-pointer text-[#635fc7] px-5 py-4 hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white  "
                    onClick={() => {
                      setIsBoardModalOpen(true);
                    }}
                  >
                    <AppstoreAddOutlined className="h-4 " style={{fontSize: '25px'}} />{" "}
                    <p className="">Create New Project </p>
                  </div>
                </div>

                {/* <div className=" mx-2  p-4 relative space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
                  <img src={lightIcon} alt="sun indicating light mode" />

                  <Switch
                    checked={darkSide}
                    onChange={toggleDarkMode}
                    className={`${
                      darkSide ? "bg-[#635fc7]" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span
                      className={`${
                        darkSide ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>

                  <img src={darkIcon} alt="moon indicating dark mode" />
                </div> */}
                
              </div>
              }
              <hr style={{ margin: '1.5rem 0', backgroundColor: 'gray' }} />
                  <h4 className=" dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 ">
                    <button style={{ display: 'flex', alignItems: 'center' }}>
                      <UsergroupAddOutlined style={{ marginRight: '10px', fontSize: '25px' }}  />
                      Invite Teammates
                    </button>
              </h4>
              <hr style={{ margin: '1.5rem 0', backgroundColor: 'gray' }} />
                  <h4 className=" dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 " onClick={showHelper}>
                    <button style={{ display: 'flex', alignItems: 'center' }}>
                      <QuestionCircleTwoTone style={{ marginRight: '10px', fontSize: '25px' }}  />
                      Help & Getting Started
                    </button>
              </h4>
              
            </div>
            
          )}
         

        </div>
      </div>

      {isBoardModalOpen && (
        <AddEditBoardModal
          type="add"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
      
    </div>
  );
}

export default Sidebar;
