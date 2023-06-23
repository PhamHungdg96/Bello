import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const CommentBox = () => {
  const [comment, setComment] = useState('');
  const [submittedComments, setSubmittedComments] = useState([]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedComments([...submittedComments, comment]);
    setComment('');
  };

  return (
    <div style={{ margin: '30px'}}>
      <div>
        <h4>Comments:</h4>
        {submittedComments.map((submittedComment, index) => (
          <p key={index}>{submittedComment}</p>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
        <Input
          // placeholder="Write a comment"
          value={comment}
          onChange={handleCommentChange}
          style={{ width: '100%', marginRight:'10px' , backgroundColor: 'inherit', color : '#fff'}}
        />
        <Button type="primary" htmlType="submit" icon={<SendOutlined />} />
      </form>
    </div>
  );
};

export default CommentBox;
