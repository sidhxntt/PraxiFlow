import React, { useState } from "react";
import useDialogState from "@/temp_hooks/use-dialog-state";
import { Task } from "@/SampleData/AdminDashboard/Tasks/schema";

type TasksDialogType = "create" | "update" | "delete" | "import";

interface TasksContextType {
  open: TasksDialogType | null;
  setOpen: (str: TasksDialogType | null) => void;
  currentRow: Task | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<Task | null>>;
}

const TasksContext = React.createContext<TasksContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function TasksProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<TasksDialogType>(null);
  const [currentRow, setCurrentRow] = useState<Task | null>(null);

  return (
    <TasksContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </TasksContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTasks = () => {
  const tasksContext = React.useContext(TasksContext);

  if (!tasksContext) {
    throw new Error("useTasks has to be used within <TasksContext.Provider>");
  }

  return tasksContext;
};
