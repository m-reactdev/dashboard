const roleOption = [
  { value: "Admin", label: "Admin" },
  { value: "Marketing", label: "Marketing" },
  { value: "Accounts", label: "Accounts" },
  { value: "Finance", label: "Finance" },
  { value: "Sales", label: "Sales" },
  { value: "Compliance", label: "Compliance" },
];

const dptOption = [
  { value: "MR", label: "Marketing" },
  { value: "SL", label: "Sales" },
  { value: "CL", label: "Compliance" },
];

const unitOption = [
  { value: "Writing", label: "Writing" },
  { value: "Design", label: "Design" },
];

const complianceOption = [
  { value: "Chargeback", label: "Chargeback" },
  { value: "Refund", label: "Refund" },
  { value: "CaseWin", label: "Case Win" },
  { value: "CaseLoss", label: "Case Loss" },
];

const saleUnitOption = [
  { value: "Unit 1(Waleed)", label: "Unit 1(Waleed)" },
  { value: "Unit 2(Waleed)", label: "Unit 2(Waleed)" },
  { value: "Unit 3(Waleed)", label: "Unit 3(Waleed)" },
  { value: "Unit 4(Waleed)", label: "Unit 4(Waleed)" },
  { value: "Unit 5(Waleed)", label: "Unit 5(Waleed)" },
  { value: "Unit 6(Waleed)", label: "Unit 6(Waleed)" },
];

const transactionOptions = [
  { value: "Check", label: "Check" },
  { value: "Cash", label: "Cash" },
  { value: "Online Transaction", label: "Online Transaction" },
  { value: "Payorder", label: "Payorder" },
];

const accountTypeOptions = [
  { value: "Salaries", label: "Salaries" },
  { value: "Commission", label: "Commission" },
  { value: "Staff Welfare", label: "Staff Welfare" },
  { value: "Electronic Items", label: "Electronic Items" },
];

export {
  roleOption,
  unitOption,
  dptOption,
  saleUnitOption,
  complianceOption,
  transactionOptions,
  accountTypeOptions,
};
