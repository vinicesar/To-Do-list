import { Box } from "@mui/material";
import { Controller } from "react-hook-form";

export function InputText({
  size,
  control,
  name,
}: {
  size: boolean;
  control: any;
  name: string;
}) {
  let styleType: { label: {}; input: {} };

  size === true
    ? (styleType = {
        label: {
          fontSize: "14px",
          position: "absolute",
          top: "8%",
          left: "17%",
        },
        input: {
          width: "10rem",
          height: "1.8rem",
          borderRadius: "20px",
          padding: ".6rem",
          fontSize: "1rem",
          position: "absolute",
          top: "14%",
          left: "5%",
          border: "solid white 1.5px",
          backgroundColor: "#322d3d",
        },
      })
    : (styleType = {
        label: {
          fontSize: "14px",
          position: "absolute",
          top: "29%",
          left: "45%",
        },
        input: {
          width: "28.4rem",
          height: "10rem",
          borderRadius: "20px",
          padding: "1rem",
          fontSize: "1rem",
          position: "absolute",
          top: "35%",
          left: "5%",
          border: "solid white 1.5px",
          backgroundColor: "#322d3d",
        },
      });

  return (
    <>
      <Box>
        <label htmlFor={size ? "nameTask" : "TextArea"} style={styleType.label}>
          {size ? "Task Name" : "Description"}
        </label>

        {size ? (
          <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
              <>
                <input {...field} id="nameTask" style={styleType.input} />
                <a
                  style={{
                    position: "absolute",
                    top: "26%",
                    left: "8%",
                    fontSize: "0.8rem",
                    color: "red",
                  }}
                >
                  {fieldState.error ? fieldState.error.message : null}
                </a>
              </>
            )}
          />
        ) : (
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <textarea {...field} id="TextArea" style={styleType.input} />
            )}
          />
        )}
      </Box>
    </>
  );
}
