import React, { useState } from "react"
import { Grid, Typography, TextField } from "@material-ui/core"
import EditButton from './buttons/EditButton'
import SaveButton from './buttons/SaveButton'
import DeleteButton from './buttons/DeleteButton'

function ReplyText(props) {
  if (props.editEnabled === false) {
    return (
      <Typography component="div" variant="body2" color="textPrimary">
        {props.text}
      </Typography>
    )
  } else {
    return (
      <TextField
        name="reply"
        variant="outlined"
        label="Reply"
        onChange={props.updateText}
        placeholder="Type reply here..."
        fullWidth
        value={props.text}
        margin={"normal"}
      />
    )
  }
}

export default function PostReply(props) {
  const [state, setState] = useState({ isEditing: false, text: props.reply.text })

  return (
    <Grid>
      <ReplyText
        text={state.text}
        editEnabled={state.isEditing}
        updateText={(e) => {
          setState({ ...state, text: e.target.value })
        }}
      />
      <Typography variant={"caption"}>{props.reply.username}</Typography>
      { props.currentUser.username === props.reply.username && (
      <Grid container spacing={1} style={{ paddingTop: '10px'}}>
        <Grid item>
          {!state.isEditing && (
            <EditButton reply={props.reply} handleClick={() => setState({ ...state, isEditing: true })} />
          )}
          {state.isEditing && (
            <SaveButton 
              reply={props.reply}
              handleClick={() => {
                setState({ ...state, isEditing: false })
                props.saveHandler(state)
              }}
            />
          )}
        </Grid>
        <Grid item>
          <DeleteButton reply={props.reply} handleClick={() => props.removeReplyFunc(props.PostReply.id)}/>
        </Grid>
      </Grid>)}
    </Grid>
  )
}
