import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import boardsSlice from "../redux/boardsSlice";
import CommentBox from "../components/CommentBox";
import { UserOutlined, DeleteOutlined,ZoomInOutlined, LinkOutlined, MoreOutlined, PushpinOutlined, LikeOutlined, CheckOutlined } from '@ant-design/icons';
import { Avatar, Button,  Divider} from 'antd';
function AddEditTaskModal({
  type,
  device,
  setIsTaskModalOpen,
  setIsAddTaskModalOpen,
  taskIndex,
  prevColIndex = 0,
}) {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );
  console.log(board)
  const priorities = ["High", "Medium", "Low"]
  const columns = board.columns;
  const col = columns.find((col, index) => index === prevColIndex);
  const task = col ? col.tasks.find((task, index) => index === taskIndex) : [];
  const [status, setStatus] = useState(columns[prevColIndex].name);
  const [newColIndex, setNewColIndex] = useState(prevColIndex);
  const [subtasks, setSubtasks] = useState([
    { title: "", isCompleted: false, id: uuidv4() },
    { title: "", isCompleted: false, id: uuidv4() },
  ]);

  const onChangeSubtasks = (id, newValue) => {
    setSubtasks((prevState) => {
      const newState = [...prevState];
      const subtask = newState.find((subtask) => subtask.id === id);
      subtask.title = newValue;
      return newState;
    });
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }
    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  if (type === "edit" && isFirstLoad) {
    setSubtasks(
      task.subtasks.map((subtask) => {
        return { ...subtask, id: uuidv4() };
      })
    );
    setTitle(task.title);
    setDescription(task.description);
    setIsFirstLoad(false);
  }

  const onDelete = (id) => {
    setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
  };

  const onSubmit = (type) => {
    if (type === "add") {
      dispatch(
        boardsSlice.actions.addTask({
          title,
          description,
          subtasks,
          status,
          newColIndex,
        })
      );
    } else {
      dispatch(
        boardsSlice.actions.editTask({
          title,
          description,
          subtasks,
          status,
          taskIndex,
          prevColIndex,
          newColIndex,
        })
      );
    }
  };

  return (
    <div
      className={
        device === "mobile"
          ? "  flex flex-col py-6 px-6 pb-40  absolute overflow-y-scroll  left-0 flex  right-0 bottom-[-100vh] top-0 dropdown "
          : "  flex flex-col py-6 px-6 pb-40  absolute overflow-y-scroll  left-0 flex  right-0 bottom-0 top-0 dropdown "
      }
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsAddTaskModalOpen(false);
      }}
    >
      {/* Modal Section */}

      <div
        className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] mx-auto h-screen w-2/5 px-8  py-8 rounded-xl "
      >
          {/* ================================
                      header
          ===================================*/}
          <h3 className=" text-lg">
          {type === "edit" ? "" : "Add New Task"} 
          </h3>
          {type === "edit" && 
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '100%',
            
          }}>
              <div style={{display: 'flex', alignItems: 'center', 
                            justifyContent: 'space-between',
                            flex: 3}}>
                    <button className="rounded-lg text-sm font-bold h-10 px-4 bg-blue-500 hover:bg-blue-600 text-white flex items-center">
                      <CheckOutlined className="text-base mr-2" />
                      Mark complete
                    </button>
              </div>
              <div style={{display: 'flex', alignItems: 'center', 
                            justifyContent: 'flex-end',
                            flex: 9}}>
                <Button variant='outlined' className="border-none">
                  <LikeOutlined className="text-white text-xl" />
                </Button>
                <Button variant='outlined' className="border-none">
                  <PushpinOutlined className="text-white text-xl" />
                </Button>
                <Button variant='outlined' className="border-none">
                  <LinkOutlined className="text-white text-xl" />
                </Button>
                <Button variant='outlined' className="border-none">
                  <ZoomInOutlined className="text-white text-xl" />
                </Button>
                <Button variant='outlined' className="border-none">
                  <MoreOutlined className="text-white text-xl" />
                </Button>
                
              </div>
          </div>
          
        }
        {/* Assignees*/}
       
        <div className="mt-4 flex l items-center space-y-1">
          <label className=" flex-1 text-sm dark:text-white text-gray-500">
            Assignees
          </label>   
          <Avatar
            size="large"
            icon={<UserOutlined />}
            src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-Facebook.jpg?ssl=1"
          />
        </div>
        {/* Task Name */}

        <div className="mt-4 flex l items-center space-y-1">
          <label className=" flex-1 text-sm dark:text-white text-gray-500">
            Task Name
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="task-name-input"
            type="text"
            className=" bg-transparent  px-4 py-2 outline-none focus:border-0 rounded-md text-sm w-5/6  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0  "
            placeholder=" e.g Take coffee break"
          />
        </div>
        {/* Project Name */}

        <div className="mt-4 flex l items-center space-y-1">
          <label className=" flex-1 text-sm dark:text-white text-gray-500">
            Project
          </label>
          <p className="  text-sm">{board.name}</p>
        </div>
        {/* Description */}
        <div className="mt-4 flex  space-y-1">
          <label className="flex-1 text-sm dark:text-white text-gray-500">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="task-description-input"
            className=" bg-transparent outline-none min-h-[200px] focus:border-0 w-5/6 px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px] "
            placeholder="e.g. It's always good to take a break. This 
            15 minute break will  recharge the batteries 
            a little."
          />
        </div>

        {/* Subtasks */}

   
        <div className="mt-4 flex space-y-3">
          <label className=" flex-1 text-sm dark:text-white text-gray-500">
            Subtasks
          </label>
          <div className="flex flex-col w-5/6">
          {subtasks.map((subtask, index) => (
            <div key={index} className=" flex items-center w-full ">
              <input
                onChange={(e) => {
                  onChangeSubtasks(subtask.id, e.target.value);
                }}
                type="text"
                value={subtask.title}
                className=" bg-transparent outline-none focus:border-0 flex-grow px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]  "
                placeholder=" e.g Take coffee break"
              />
              <img
                src={crossIcon}
                onClick={() => {
                  onDelete(subtask.id);
                }}
                className=" m-4 cursor-pointer "
              />
            </div>
          ))}
          

          <button
            className=" w-full mt-[10px] items-center dark:text-[#635fc7] dark:bg-white  text-white bg-[#635fc7] py-2 rounded-full "
            onClick={() => {
              setSubtasks((state) => [
                ...state,
                { title: "", isCompleted: false, id: uuidv4() },
              ]);
            }}
          >
            + Add New Subtask
          </button>
          </div>
        </div>

        {/* current Status  */}
        <div  className="mt-4 flex l space-y-1 items-center ">
              <label className="flex-1 text-sm dark:text-white text-gray-500">
                Current Status
              </label>
              <select
                value={status}
                onChange={onChangeStatus}
                className="select-status w-5/6  px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none" // Add the text color class here
              >
                {columns.map((column, index) => {
                  return (
                    <option key={index} style={{ color: '#635fc7', fontWeight: '500' }}>{column.name}</option>
                  );
                })}
              </select>
        </div>
        <div className="mt-4 flex l space-y-1 items-center ">
                <label className="flex-1 text-sm dark:text-white text-gray-500">
                  Priority
                </label>
                <select
                  value={status}
                  onChange={onChangeStatus}
                  className="select-status w-5/6 px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none" // Add the text color class here
                >
                  {priorities.map((priority, index) => (
                    <option key={index} style={{color: '#635fc7', fontWeight: '500'}}>{priority}</option>
                  ))}
                </select>
        </div>
          
        
  
        
        <button
            onClick={() => {
              const isValid = validate();
              if (isValid) {
                onSubmit(type);
                setIsAddTaskModalOpen(false);
                type === "edit" && setIsTaskModalOpen(false);
              }
            }}
            className=" w-full items-center text-white bg-[#635fc7] py-2 rounded-full mt-[20px]"
          >
           {type === "edit" ? " save edit" : "Create task"}
          </button>
      </div>
      {/* <div
        className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] mx-auto h-screen w-2/5 px-8  py-8 rounded-xl"
      >
            <CommentBox/>
      </div> */}
      
    </div>
  );
}

export default AddEditTaskModal;
