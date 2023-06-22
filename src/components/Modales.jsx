import { Modal, Box, Typography } from "@mui/material";

export default function Modales({
  openModal,
  handleCloseModal,
  errorTitle,
  errorMessage,
}) {
  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "rgba(208, 234, 255, 1)", // Color de fondo
          boxShadow: 24,
          p: 2,
          minWidth: 300,
          maxWidth: 400,
          borderRadius: 4,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            borderBottom: "1px solid",
            mb: 2,
            pb: 1,
          }}
        >
          {errorTitle}
        </Typography>
        <Typography variant="body1">{errorMessage}</Typography>
      </Box>
    </Modal>
  );
}
