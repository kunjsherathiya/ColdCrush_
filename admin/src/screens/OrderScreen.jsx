import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip,
} from "@mui/material";

const mockOrders = [
  { id: "#ORD001", customer: "John Doe", date: "2024-01-15", amount: "₹1,200", status: "Delivered" },
  { id: "#ORD002", customer: "Jane Smith", date: "2024-01-16", amount: "₹850", status: "Pending" },
  { id: "#ORD003", customer: "Bob Johnson", date: "2024-01-17", amount: "₹2,400", status: "Processing" },
  { id: "#ORD004", customer: "Alice Brown", date: "2024-01-18", amount: "₹600", status: "Cancelled" },
];

const statusColor = {
  Delivered: "success",
  Pending: "warning",
  Processing: "info",
  Cancelled: "error",
};

export default function OrderScreen() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>Orders</Typography>
      <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e2e8f0", borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f1f5f9" }}>
            <TableRow>
              {["Order ID", "Customer", "Date", "Amount", "Status"].map((h) => (
                <TableCell key={h} sx={{ fontWeight: 600 }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {mockOrders.map((order) => (
              <TableRow key={order.id} hover>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>
                  <Chip label={order.status} color={statusColor[order.status]} size="small" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
