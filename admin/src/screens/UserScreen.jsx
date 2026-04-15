import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Avatar, Chip,
} from "@mui/material";

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", joined: "2024-01-10", orders: 5, status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", joined: "2024-01-12", orders: 3, status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", joined: "2024-01-14", orders: 1, status: "Inactive" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", joined: "2024-01-18", orders: 8, status: "Active" },
];

export default function UserScreen() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>Users</Typography>
      <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e2e8f0", borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f1f5f9" }}>
            <TableRow>
              {["User", "Email", "Joined", "Orders", "Status"].map((h) => (
                <TableCell key={h} sx={{ fontWeight: 600 }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: "#6366f1", fontSize: 14 }}>
                      {user.name.charAt(0)}
                    </Avatar>
                    {user.name}
                  </Box>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.joined}</TableCell>
                <TableCell>{user.orders}</TableCell>
                <TableCell>
                  <Chip
                    label={user.status}
                    color={user.status === "Active" ? "success" : "default"}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
