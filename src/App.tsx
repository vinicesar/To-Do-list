import { Grid, Modal } from "@mui/material";
import "./App.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { InputText } from "./components/inputText";
import RadiosField from "./components/radiosField";
import { Form, useForm } from "react-hook-form";
import {
  schemaTask,
  type CreatTask,
  type Task,
  type UpdateTaskInput,
} from "./types/task";
import { v1 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { MyGrid } from "./components/list/Lista";

function AddTaskButton() {
  const { control, reset } = useForm<UpdateTaskInput>({
    defaultValues: {
      taskName: "",
      description: "",
      priority: "Medium",
    },
    resolver: zodResolver(schemaTask),
  });

  const onSubmit = (data: UpdateTaskInput) => {
    reset();
    closeModal();

    const { priority, taskName, description } = data;

    const newTask: CreatTask = {
      id: v1(),
      priority: priority,
      taskName: taskName,
      description: description,
      status: "peding",
      date: new Date(),
    };

    const localStoragePost = (taskNew: Task) => {
      const raw = localStorage.getItem("tasks");
      let allTasks = JSON.parse(raw ?? "[]");

      allTasks.push(taskNew);

      localStorage.setItem("tasks", JSON.stringify(allTasks));
      const bc = new BroadcastChannel("tasks");
      bc.postMessage("updated");
    };

    localStoragePost(newTask);
  };

  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  function CardNewTask() {
    return (
      <>
        <Form<UpdateTaskInput>
          control={control}
          onSubmit={({ data }) => {
            onSubmit(data);
          }}
        >
          <Grid
            sx={{
              display: "flex",
              bgcolor: "#332f2f",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "34rem",
              height: "25rem",
              borderRadius: "55px",
              textAlign: "center",
              flexDirection: "column",
            }}
          >
            <Grid>
              <h2>New Task</h2>
            </Grid>
            <Grid size={12} padding={".7rem"}>
              <InputText size={true} control={control} name="taskName" />
            </Grid>
            <Grid>
              <RadiosField control={control} />
            </Grid>
            <Grid>
              <InputText size={false} control={control} name="description" />
            </Grid>
            <Grid>
              <button
                style={{
                  position: "absolute",
                  top: "85%",
                  left: "44%",
                }}
                type="submit"
              >
                Save
              </button>
            </Grid>
          </Grid>
        </Form>
      </>
    );
  }

  return (
    <>
      <IconButton onClick={openModal}>
        <AddCircleIcon sx={{ fontSize: 70, color: "gray" }}></AddCircleIcon>
      </IconButton>

      <Modal open={open} onClose={closeModal}>
        <CardNewTask />
      </Modal>
    </>
  );
}

function App() {
  return (
    <>
      <Grid container minWidth={"100vw"}>
        <Grid
          sx={{
            bgcolor: "#4a4a46",
            height: "3.5rem",
            fontFamily: "Dancing Script",
            margin: "1rem",
            borderRadius: "10px",
          }}
          size={12}
        >
          <h1>To-Do List</h1>
        </Grid>

        <MyGrid />

        <Grid
          sx={{
            position: "fixed",
            top: "90%",
            left: "4%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <AddTaskButton />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
