import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@hidstech/common_components/components/ui/table.js";

const orders = [
  {
    id: "ORD001",
    customer: "John Doe",
    program: "Fitness Bootcamp",
    amount: "$199.99",
    status: "Completed",
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    program: "Yoga Retreat",
    amount: "$299.99",
    status: "Processing",
  },
  {
    id: "ORD003",
    customer: "Bob Johnson",
    program: "Nutrition Coaching",
    amount: "$149.99",
    status: "Pending",
  },
  {
    id: "ORD004",
    customer: "Alice Brown",
    program: "Personal Training",
    amount: "$399.99",
    status: "Completed",
  },
  {
    id: "ORD005",
    customer: "Charlie Wilson",
    program: "Weight Loss Challenge",
    amount: "$249.99",
    status: "Processing",
  },
];

export function RecentOrders() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Program</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.customer}</TableCell>
            <TableCell>{order.program}</TableCell>
            <TableCell>{order.amount}</TableCell>
            <TableCell>{order.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
