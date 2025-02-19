import { Button, Paper, TextField, Typography } from "@mui/material";
import FileBase from "react-file-base64";
import React, { useState } from "react";

const Form = () => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  return (
    <div className="space-y-2">
        <Paper className="p-4">
      <form autoComplete="off" noValidate className="flex flex-wrap justify-center">
        <Typography variant="h6">A Memory</Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />

        <div className="w-[97%] my-10">
          {/* <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          /> */}
        </div>
        <Button
          className="mb-[10px]"
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
        //   onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
    </div>
  );
};

export default Form;
