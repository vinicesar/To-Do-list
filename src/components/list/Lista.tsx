import { AgGridReact } from "ag-grid-react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { themeQuartz } from "ag-grid-community";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import IconButton from "@mui/material/IconButton";
import { Delete, Edit } from "@mui/icons-material";

type StatusType = "peding" | "in-progress" | "completed";

type row = {
  taskName: string;
  description: string;
  priority: string;
  status: StatusType;
  date: string;
  id: string;
};

export function MyGrid() {
  const theme = useMemo(
    () =>
      themeQuartz.withParams({
        accentColor: "#000",
        foregroundColor: "#fff",
        backgroundColor: "#4a4a46",
        headerBackgroundColor: "gray",
        rowHoverColor: "#0f1f2f",
        headerTextColor: "#111827",
        spacing: 10,
        fontFamily:
          "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
      }),
    []
  );

  const [columnDefs] = useState<ColDef<row>[]>([
    { headerName: "nome", field: "taskName", width: 100 },
    { headerName: "descriçao", field: "description", width: 300 },
    { headerName: "proridade", field: "priority", width: 150 },
    {
      headerName: "status",
      field: "status",
      cellRenderer: (p: ICellRendererParams<row>) =>
        p.data ? actionsButtonsEd(p.data.id) : null,
    },

    {
      headerName: "data",
      field: "date",
      width: 162,
      valueFormatter: (p) =>
        p.value ? new Date(p.value).toLocaleDateString("pt-BR") : "",
    },
    {
      headerName: "Deletar",
      field: "id",
      width: 90,
      pinned: "right",
      cellRenderer: (p: ICellRendererParams<row>) =>
        p.data ? actionsButtonsDL(p.data.id) : null,
    },
  ]);

  const [rowData, setRowDate] = useState<row[]>([]);

  const atualizarLista = useCallback(() => {
    const LI = localStorage.getItem("tasks");
    const parsed = LI ? JSON.parse(LI) : [];
    return setRowDate(Array.isArray(parsed) ? parsed : []);
  }, []);

  useEffect(() => {
    const bc = new BroadcastChannel("tasks");
    bc.onmessage = () => atualizarLista();

    return () => {
      bc.close();
    };
  }, [atualizarLista]);

  useEffect(() => {
    atualizarLista();
  }, []);

  const actionsButtonsEd = (id: string) => {
    const LI = localStorage.getItem("tasks");
    const parsed = LI ? JSON.parse(LI) : [];
    const status = parsed.find((e: row) => e.id === id);

    function getStatus() {
      const valid = status!.status;

      switch (valid) {
        case "peding":
          status!.status = "in-progress";
          break;
        case "in-progress":
          status!.status = "completed";
          break;
        case "completed":
          status!.status = "peding";
          break;
      }

      localStorage.setItem("tasks", JSON.stringify(parsed));
      setRowDate(parsed);
    }

    return (
      <>
        <span style={{ margin: ".4rem" }}>{status ? status.status : null}</span>
        <IconButton
          onClick={() => getStatus()}
          aria-label="edit"
          sx={{
            backgroundColor: "#1976D2",
            color: "white",
            "&:hover": {
              backgroundColor: "#1565C0",
            },
            borderRadius: "50%",
            width: "1.6rem",
            height: "1.6rem",
          }}
        >
          <Edit />
        </IconButton>
      </>
    );
  };

  const actionsButtonsDL = (id: string) => {
    const LI = localStorage.getItem("tasks");
    const parsed = LI ? JSON.parse(LI) : [];
    const update = parsed.filter((e: row) => e.id !== id);

    function handleDelete() {
      localStorage.setItem("tasks", JSON.stringify(update));
      setRowDate(update);
    }

    return (
      <IconButton
        onClick={() => handleDelete()}
        aria-label="delete"
        sx={{
          backgroundColor: "#D32F2F",
          color: "white",
          "&:hover": {
            backgroundColor: "#B71C1C",
          },
          borderRadius: "50%",
          width: "1.6rem",
          height: "1.6rem",
        }}
      >
        <Delete />
      </IconButton>
    );
  };

  return (
    <div
      style={{
        height: "70vh",
        width: "77vw",
        position: "absolute",
        top: "15%",
        left: "11%",
      }}
    >
      <AgGridReact
        theme={theme}
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
      />
    </div>
  );
}
