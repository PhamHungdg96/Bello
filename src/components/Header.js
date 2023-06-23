import React, { useState } from "react";
import Logo from "../assets/ASAN.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import HeaderDropDown from "./HeaderDropDown";
import ElipsisMenu from "./ElipsisMenu";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../modals/DeleteModal";
import boardsSlice from "../redux/boardsSlice";
import { setAuthToken } from '../helpers/setAuthToken';
import AvatarMenu from './AvatarMenu';
import EmojiPicker from "./EmojiPicker";
import { AntDesignOutlined, UserOutlined, StarOutlined, ShareAltOutlined,
        SearchOutlined, ClockCircleOutlined, DownOutlined, UpOutlined, TeamOutlined } from '@ant-design/icons';
import { Input, Tooltip, Tabs, Button, Avatar, Space} from 'antd';
import '../styles/header.css';

function Header({ setIsBoardModalOpen, isBoardModalOpen }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [icon, setIcon] = useState('')
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleButtonClick = () => {
    // Handle button click event here
    console.log('Button clicked!');
  };
  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
    setIsElipsisMenuOpen(false);
    setBoardType("add");
  };

  const setOpenEditModal = () => {
    setIsBoardModalOpen(true);
    setIsElipsisMenuOpen(false);
  };
  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(boardsSlice.actions.deleteBoard());
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };
  const onIconChange = async (newIcon) => {
    // let temp = [...boards]
    // const index = temp.findIndex(e => e.id === boardId)
    // temp[index] = { ...temp[index], icon: newIcon }

    // // if (isFavourite) {
    // //   let tempFavourite = [...favouriteList]
    // //   const favouriteIndex = tempFavourite.findIndex(e => e.id === boardId)
    // //   tempFavourite[favouriteIndex] = { ...tempFavourite[favouriteIndex], icon: newIcon }
    // //   dispatch(setFavouriteList(tempFavourite))
    // // }

    setIcon(newIcon)
    // dispatch(setBoards(temp))
    // try {
    //   await boardApi.update(boardId, { icon: newIcon })
    // } catch (err) {
    //   alert(err)
    // }
  }
  const onSearch = async (txtSearch) =>{
      console.log(txtSearch);
  }
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  // Function to handle logout
  const handleLogout = () => {
    setAuthToken(null);
    // console.log(isAuthenticated);
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.href = '/login';
  };
  return (
    <div className=" p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0 ">
      <header className=" flex justify-between dark:text-white items-center  ">
        {/* Left Side  */}
        <div className=" flex items-center space-x-2  md:space-x-4 ml-10">
          <img src={Logo} alt=" Logo " className=" h-6 w-6" />
          <h4 className=" md:text-4xl  hidden md:inline-block font-bold  font-sans">
            asana
          </h4>
          <div className="flex items-center">
            <h4 className=" truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans ">
              {board.name}
            </h4>
            <Button
              shape="circle"
              style={{ color: '#ffffff', marginLeft: '10px', border: 'none', alignItems:'center', textAlign:'center' }}
              icon={openDropdown ? 
                    <DownOutlined style={{ color: '#fff', fontSize: '17px' }}/>
                    :<UpOutlined style={{ color: '#fff', fontSize: '17px' }}/>}
              onClick={onDropdownClick}
              />
            <Button
              shape="circle"
              style={{ color: '#ffffff', marginLeft: '10px', border: 'none', alignItems:'center', textAlign:'center' }}
              icon={<StarOutlined style={{ color: '#ffc53d', fontSize: '17px' }} />}
            />
            <Button
              shape="circle"
              style={{ color: '#ffffff', marginLeft: '10px', border: 'none', alignItems:'center', textAlign:'center' }}
              icon={<ClockCircleOutlined style={{ color: '#fff', fontSize: '17px' }} />}
            />
            <p> Set status </p>
            <img
              src={openDropdown ? iconUp : iconDown}
              alt=" dropdown icon"
              className=" w-3 ml-2 md:hidden"
              onClick={onDropdownClick}
            />
           
          </div>
        </div>

        {/* Right Side */}

        <div className=" flex space-x-4 items-center md:space-x-6 ">
          <Avatar.Group
                maxCount={2}
                maxStyle={{
                  color: '#f56a00',
                  backgroundColor: '#fde3cf',
                }}
                style={{marginLeft: '20px'}}
              >
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
                <Avatar
                  style={{
                    backgroundColor: '#f56a00',
                  }}
                >
                  K
                </Avatar>
                <Tooltip title="Ant User" placement="top">
                  <Avatar
                    style={{
                      backgroundColor: '#87d068',
                    }}
                    icon={<UserOutlined />}
                  />
                </Tooltip>
                <Avatar
                  style={{
                    backgroundColor: '#1677ff',
                  }}
                  icon={<AntDesignOutlined />}
                />
            </Avatar.Group>
            <Button type='default' ghost onClick={handleButtonClick}
                    style={{display: 'flex',alignItems: 'center', fontWeight: 'bold'}}>
              <TeamOutlined style={{ marginRight: '4px'}} />
              Share
            </Button>
            <Space.Compact
              style={{
                width: '100%',
              }}
            > 
              <Input
                placeholder="Search"
                style={{ color: '#808080' }}
              />
              <Button type="primary" icon={<SearchOutlined className="search-icon"/>} className="custom-button"></Button>
            </Space.Compact>
            {/* <button
              className=" button hidden md:hidden"
              onClick={() => {
                setIsTaskModalOpen((prevState) => !prevState);
              }}
            >
              + Add New Task
            </button> */}
            <button
              onClick={() => {
                setIsTaskModalOpen((prevState) => !prevState);
              }}
              className=" button py-1 px-3 md:block "
            >
              +
            </button>
            
            <img
              onClick={() => {
                setBoardType("edit");
                setOpenDropdown(false)
                setIsElipsisMenuOpen((prevState) => !prevState);
              }}
              src={elipsis}
              alt="elipsis"
              className=" cursor-pointer h-6"
            />
            {isElipsisMenuOpen && (
              <ElipsisMenu
                type="Boards"
                setOpenEditModal={setOpenEditModal}
                setOpenDeleteModal={setOpenDeleteModal}
              />
            )}
          <AvatarMenu/>
        </div>

        {openDropdown && (
          <HeaderDropDown
            setOpenDropdown={setOpenDropdown}
            setIsBoardModalOpen={setIsBoardModalOpen}
          />
        )}
      </header>
      {isTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsTaskModalOpen}
          type="add"
          device="mobile"
        />
      )}

      {isBoardModalOpen && (
        <AddEditBoardModal
          setBoardType={setBoardType}
          type={boardType}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          type="board"
          title={board.name}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
    </div>
  );
}

export default Header;
