import {
  LayoutDashboard, Users, ShieldCheck, HardHat, FolderKanban, Building2, Briefcase,
  ClipboardList, FileText, BookOpen, Receipt, BarChart3, Settings, Bell, UserCircle,
  FileCheck2, MapPin, FileInput, Activity, Calculator, Camera, ListChecks,
  Landmark, Wallet, Banknote, BadgeCheck, FlaskConical, PenSquare, MessageSquareWarning,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Role = "superadmin" | "admin" | "engineer";

export type ModuleField = {
  key: string;
  label: string;
  type?: "text" | "number" | "select" | "date" | "textarea" | "status";
  options?: string[];
};

export type ModuleConfig = {
  slug: string;
  title: string;
  icon: LucideIcon;
  description?: string;
  fields: ModuleField[];
  data: Record<string, any>[];
};

export type SidebarGroup = {
  label: string;
  icon: LucideIcon;
  slug?: string;
  children?: { label: string; slug: string }[];
};

// ---------- HIMUDA reference data ----------
const names = [
  "Rakesh Sharma","Priya Verma","Anil Kumar","Sneha Joshi","Arjun Mehta","Pooja Thakur",
  "Vikram Negi","Neha Gupta","Karan Chauhan","Aisha Khan","Rohit Sood","Meera Nair",
  "Sandeep Rana","Divya Pillai","Manish Tiwari","Suresh Babu","Lata Reddy","Deepak Bhardwaj",
];
const cities = ["Shimla","Dharamshala","Mandi","Solan","Kullu","Hamirpur","Bilaspur","Una","Chamba","Kangra","Nahan","Palampur"];
const depts = [
  "HIMUDA HQ Shimla","Housing Division","Urban Planning","Town & Country Planning",
  "Infrastructure Wing","Land Acquisition","Estate Management","Finance & Accounts",
];
const projectNames = [
  "New Shimla Housing Colony","Kasumpti Multi-Storey Flats","Dharamshala Urban Extension",
  "Mandi Township Phase","Solan IT Park Housing","Kullu Tourist Plaza","Hamirpur Group Housing",
  "Bilaspur Riverfront Development","Parwanoo EWS Quarters","Nahan Heritage Plaza",
  "Palampur Eco-Township","Una Industrial Workers Housing",
];
const contractors = [
  "HP Constructions Pvt Ltd","Shivalik Builders","Dhauladhar Infra","Himalayan Projects Ltd",
  "Beas Valley Developers","Satluj Engineering Co","Kangra Builders","Mandi Infra Works",
  "Solan Civil Works","Chamba Construction Co",
];
const workTypes = ["Civil","Electrical","Plumbing","Earthwork","Finishing","Road Works","Boundary Wall","Drainage"];

const status = ["Active","In Progress","Pending","Approved","Completed","On Hold"];
const pickS = (i: number) => status[i % status.length];
const dateAgo = (d: number) => new Date(Date.now() - d * 86400000).toISOString().slice(0, 10);
const emailOf = (n: string) => `${n.toLowerCase().replace(/\s+/g, ".")}@himuda.hp.gov.in`;
const phoneOf = (i: number) => `+91 9${(810000000 + i * 13177) % 1000000000}`.replace(/(\d{5})(\d{5})/, "$1 $2");

// ---------- builders (every column filled) ----------
const buildUsers = (count = 28) => Array.from({ length: count }, (_, i) => ({
  id: `USR-${1000 + i}`,
  name: names[i % names.length],
  email: emailOf(names[i % names.length]),
  phone: phoneOf(i),
  role: ["SuperAdmin","Admin","Engineer","Clerk"][i % 4],
  department: depts[i % depts.length],
  station: cities[i % cities.length],
  status: i % 6 === 0 ? "Inactive" : "Active",
  joined: dateAgo(i * 7 + 5),
}));

const buildAdmins = (count = 10) => Array.from({ length: count }, (_, i) => ({
  id: `ADM-${3000 + i}`,
  name: names[(i + 1) % names.length],
  email: emailOf(names[(i + 1) % names.length]),
  designation: ["Estate Officer","Town Planner","Accounts Officer","Section Officer","Joint Secretary"][i % 5],
  department: depts[i % depts.length],
  region: cities[i % cities.length],
  phone: phoneOf(i + 3),
  status: i % 5 === 0 ? "Inactive" : "Active",
  joined: dateAgo(i * 20 + 30),
}));

const buildEngineers = (count = 22) => Array.from({ length: count }, (_, i) => ({
  id: `ENG-${2000 + i}`,
  name: names[(i + 2) % names.length],
  email: emailOf(names[(i + 2) % names.length]),
  phone: phoneOf(i + 7),
  specialization: ["Civil","Electrical","Mechanical","Structural"][i % 4],
  designation: ["Junior Engineer","Assistant Engineer","Executive Engineer","Superintending Engineer"][i % 4],
  region: cities[i % cities.length],
  activeProjects: 2 + (i % 5),
  status: i % 7 === 0 ? "On Leave" : "Active",
  joined: dateAgo(i * 10 + 14),
}));

const buildProjects = (count = 22) => Array.from({ length: count }, (_, i) => ({
  id: `PRJ-${5000 + i}`,
  name: projectNames[i % projectNames.length] + ` - Phase ${1 + (i % 4)}`,
  department: depts[i % depts.length],
  location: cities[i % cities.length],
  estimateValue: `₹${(20 + i * 7).toFixed(0)} Cr`,
  sanctionedBudget: `₹${(18 + i * 7).toFixed(0)} Cr`,
  progress: `${Math.min(100, 10 + i * 4)}%`,
  contractor: contractors[i % contractors.length],
  assignedEngineer: names[(i + 2) % names.length],
  assignedAdmin: names[(i + 1) % names.length],
  status: pickS(i),
  startDate: dateAgo(i * 12 + 60),
  expectedEnd: dateAgo(-1 * (60 + i * 8)),
}));

const buildEstimates = (count = 18) => Array.from({ length: count }, (_, i) => ({
  id: `EST-${10000 + i}`,
  project: projectNames[i % projectNames.length] + ` - Phase ${1 + (i % 3)}`,
  workType: workTypes[i % workTypes.length],
  preparedBy: names[(i + 2) % names.length],
  approvingAuthority: ["Chief Engineer","Vice Chairman","CEO HIMUDA","Director Tech"][i % 4],
  amount: `₹${(8 + i * 2.4).toFixed(2)} Cr`,
  revision: `R${i % 4}`,
  preparedOn: dateAgo(i * 6 + 4),
  validTill: dateAgo(-1 * (30 + i * 4)),
  status: ["Draft","Submitted","Approved","Revised","Approved"][i % 5],
}));

const buildDepartments = () => depts.map((d, i) => ({
  id: `DEP-${100 + i}`,
  name: d,
  head: names[i % names.length],
  contact: phoneOf(i + 20),
  station: cities[i % cities.length],
  projects: 4 + i,
  budget: `₹${(120 + i * 35)} Cr`,
  status: "Active",
}));

const buildContractors = (count = 14) => Array.from({ length: count }, (_, i) => ({
  id: `CON-${4000 + i}`,
  name: contractors[i % contractors.length],
  gstin: `02AAACR${1000 + i}A1Z5`,
  pan: `AAACR${1000 + i}A`,
  contactPerson: names[i % names.length],
  phone: phoneOf(i + 30),
  region: cities[i % cities.length],
  activeProjects: 1 + (i % 5),
  rating: `${(3.2 + (i % 18) * 0.1).toFixed(1)}/5`,
  status: i % 8 === 0 ? "Blacklisted" : "Active",
  onboarded: dateAgo(i * 25 + 90),
}));

const buildWorkOrders = (count = 18) => Array.from({ length: count }, (_, i) => ({
  id: `WO-${6000 + i}`,
  project: projectNames[i % projectNames.length],
  contractor: contractors[i % contractors.length],
  workType: workTypes[i % workTypes.length],
  amount: `₹${(5 + i * 1.6).toFixed(2)} Cr`,
  issuedBy: names[(i + 1) % names.length],
  issued: dateAgo(i * 8 + 10),
  deadline: dateAgo(-1 * (30 + i * 5)),
  priority: ["High","Medium","Low"][i % 3],
  status: pickS(i),
}));

const buildTenders = (count = 14) => Array.from({ length: count }, (_, i) => ({
  id: `TND-${7000 + i}`,
  title: projectNames[i % projectNames.length] + " - Tender Notice",
  department: depts[i % depts.length],
  estimate: `₹${(15 + i * 4)} Cr`,
  emd: `₹${(0.3 + i * 0.08).toFixed(2)} Cr`,
  publishedOn: dateAgo(i * 5 + 10),
  closeDate: dateAgo(-1 * (i + 5)),
  bidders: 2 + (i % 8),
  awardedTo: contractors[i % contractors.length],
  status: ["Open","Closed","Awarded","Cancelled"][i % 4],
}));

const buildMB = (count = 16) => Array.from({ length: count }, (_, i) => ({
  id: `MB-${8000 + i}`,
  project: projectNames[i % projectNames.length],
  engineer: names[(i + 2) % names.length],
  workType: workTypes[i % workTypes.length],
  quantity: 100 + i * 12,
  unit: ["Cum","Sqm","Rmt","Nos"][i % 4],
  rate: `₹${(450 + i * 35)}`,
  amount: `₹${(2 + i * 0.4).toFixed(2)} Cr`,
  submitted: dateAgo(i * 4 + 2),
  status: ["Submitted","Verified","Approved","Rejected"][i % 4],
}));

const buildBills = (count = 20) => Array.from({ length: count }, (_, i) => ({
  id: `BIL-${9000 + i}`,
  project: projectNames[i % projectNames.length],
  contractor: contractors[i % contractors.length],
  billType: ["RA Bill","Final Bill","Advance","Mobilization"][i % 4],
  amount: `₹${(3 + i * 0.7).toFixed(2)} Cr`,
  gstAmount: `₹${(0.5 + i * 0.12).toFixed(2)} Cr`,
  itDeduction: `₹${(0.06 + i * 0.014).toFixed(2)} Cr`,
  labourCess: `₹${(0.03 + i * 0.007).toFixed(2)} Cr`,
  securityDeposit: `₹${(0.15 + i * 0.035).toFixed(2)} Cr`,
  netPayable: `₹${((3 + i * 0.7) - (0.06 + i * 0.014) - (0.03 + i * 0.007) - (0.15 + i * 0.035)).toFixed(2)} Cr`,
  submitted: dateAgo(i * 6 + 3),
  payment: ["Pending","Processing","Paid","On Hold"][i % 4],
  status: ["Verified","Approved","Pending","Rejected"][i % 4],
}));

const buildDPR = (count = 22) => Array.from({ length: count }, (_, i) => ({
  id: `DPR-${11000 + i}`,
  project: projectNames[i % projectNames.length],
  engineer: names[(i + 2) % names.length],
  date: dateAgo(i + 1),
  workDone: workTypes[i % workTypes.length],
  progress: `${Math.min(100, 5 + i * 4)}%`,
  workforce: 20 + (i % 30),
  weather: ["Clear","Rainy","Cloudy","Snow"][i % 4],
  status: ["Submitted","Reviewed","Approved","Pending"][i % 4],
}));

const buildSiteMonitoring = (count = 14) => Array.from({ length: count }, (_, i) => ({
  id: `SM-${12000 + i}`,
  project: projectNames[i % projectNames.length],
  location: cities[i % cities.length],
  geo: `${(30.5 + (i % 15) * 0.18).toFixed(4)}, ${(76.5 + (i % 15) * 0.21).toFixed(4)}`,
  photos: 3 + (i % 6),
  inspector: names[(i + 2) % names.length],
  lastVisit: dateAgo(i * 2 + 1),
  status: ["On Track","Delayed","Issue","On Track"][i % 4],
}));

const buildDocuments = (count = 18) => Array.from({ length: count }, (_, i) => ({
  id: `DOC-${13000 + i}`,
  name: ["Site Plan","Soil Report","Tender Doc","Approval Letter","Photo Log","DPR Sheet"][i % 6] + ` v${1 + (i % 3)}.pdf`,
  project: projectNames[i % projectNames.length],
  type: ["Drawing","Report","Approval","Photo","Estimate"][i % 5],
  uploadedBy: names[i % names.length],
  size: `${(0.5 + (i % 16) * 0.5).toFixed(2)} MB`,
  uploaded: dateAgo(i * 3 + 2),
}));

const buildNotifications = (count = 16) => Array.from({ length: count }, (_, i) => ({
  id: `NTF-${14000 + i}`,
  title: ["New MB submitted","Bill approved","Project assigned","Tender awarded","DPR pending review","Estimate revised"][i % 6],
  type: ["Info","Success","Warning","Action"][i % 4],
  target: ["You","All Admins","SuperAdmin","Engineer Team"][i % 4],
  sender: names[i % names.length],
  sent: dateAgo(i + 1),
  status: i % 3 === 0 ? "Unread" : "Read",
}));

const buildAuditLogs = (count = 28) => Array.from({ length: count }, (_, i) => ({
  id: `LOG-${15000 + i}`,
  actor: names[i % names.length],
  action: ["Created","Updated","Deleted","Approved","Rejected","Login","Logout"][i % 7],
  entity: ["Project","User","Bill","MB","WorkOrder","Tender","Estimate"][i % 7],
  ip: `10.0.${i % 250}.${(i * 7) % 250}`,
  device: ["Windows / Chrome","macOS / Safari","Android / Chrome","iOS / Safari"][i % 4],
  timestamp: new Date(Date.now() - i * 3600_000).toISOString().slice(0, 16).replace("T", " "),
}));

const buildTasks = (count = 18) => Array.from({ length: count }, (_, i) => ({
  id: `TSK-${16000 + i}`,
  title: [
    "Foundation concrete pouring","Brickwork ground floor","Roof slab shuttering",
    "Electrical conduit laying","Plumbing risers","Plaster external walls",
    "Boundary wall masonry","Road sub-base preparation","Painting interior",
    "Drainage line trenching",
  ][i % 10],
  project: projectNames[i % projectNames.length],
  assignedTo: names[(i + 2) % names.length],
  assignedBy: names[(i + 1) % names.length],
  priority: ["High","Medium","Low"][i % 3],
  startDate: dateAgo(i * 3 + 2),
  dueDate: dateAgo(-1 * (5 + i * 2)),
  progress: `${Math.min(100, 10 + i * 5)}%`,
  status: ["Assigned","In Progress","Submitted","Approved","On Hold"][i % 5],
}));

const buildProgress = (count = 16) => Array.from({ length: count }, (_, i) => {
  const n = 2 + (i % 5);
  const photos = Array.from({ length: n }, (_, j) => `https://picsum.photos/seed/himuda-prg-${i}-${j}/640/420`);
  return {
    id: `PRG-${17000 + i}`,
    taskId: `TSK-${16000 + (i % 18)}`,
    project: projectNames[i % projectNames.length],
    engineer: names[(i + 2) % names.length],
    workDescription: ["Concrete cube test","Slab reinforcement done","Brickwork up to lintel","Plaster 1st coat done","Doors fixed","Tiling completed","Painting in progress","Electrical wiring routed"][i % 8],
    progressPercent: `${Math.min(100, 15 + i * 5)}%`,
    photosCount: n,
    geoTag: `${(30.5 + (i % 15) * 0.18).toFixed(4)}, ${(76.5 + (i % 15) * 0.21).toFixed(4)}`,
    remarks: ["Site cleared and ready","Quality check passed by JE","Material delivered on site","Awaiting executive engineer review","Weather delayed casting by 1 day"][i % 5],
    inspector: names[(i + 4) % names.length],
    submittedOn: dateAgo(i + 1),
    status: ["Submitted","Approved","Reviewed","Pending"][i % 4],
    photos,
  };
});

// ---------- field definitions ----------
const userFields: ModuleField[] = [
  { key: "id", label: "ID" }, { key: "name", label: "Name" }, { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "role", label: "Role", type: "select", options: ["SuperAdmin","Admin","Engineer","Clerk"] },
  { key: "department", label: "Department", type: "select", options: depts },
  { key: "station", label: "Station" },
  { key: "status", label: "Status", type: "status", options: ["Active","Inactive"] },
  { key: "joined", label: "Joined", type: "date" },
];
const engFields: ModuleField[] = [
  { key: "id", label: "ID" }, { key: "name", label: "Name" }, { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "specialization", label: "Specialization", type: "select", options: ["Civil","Electrical","Mechanical","Structural"] },
  { key: "designation", label: "Designation" }, { key: "region", label: "Region" },
  { key: "activeProjects", label: "Projects", type: "number" },
  { key: "status", label: "Status", type: "status" }, { key: "joined", label: "Joined", type: "date" },
];
const adminFields: ModuleField[] = [
  { key: "id", label: "ID" }, { key: "name", label: "Name" }, { key: "email", label: "Email" },
  { key: "designation", label: "Designation" }, { key: "department", label: "Department" },
  { key: "region", label: "Region" }, { key: "phone", label: "Phone" },
  { key: "status", label: "Status", type: "status" }, { key: "joined", label: "Joined", type: "date" },
];
const projectFields: ModuleField[] = [
  { key: "id", label: "Project ID" }, { key: "name", label: "Project Name" },
  { key: "department", label: "Department" }, { key: "location", label: "Location" },
  { key: "estimateValue", label: "Estimate" }, { key: "sanctionedBudget", label: "Sanctioned" },
  { key: "progress", label: "Progress" }, { key: "contractor", label: "Contractor" },
  { key: "assignedEngineer", label: "Engineer" }, { key: "assignedAdmin", label: "Admin" },
  { key: "status", label: "Status", type: "status" },
  { key: "startDate", label: "Start", type: "date" }, { key: "expectedEnd", label: "Target End", type: "date" },
];
const estimateFields: ModuleField[] = [
  { key: "id", label: "Estimate No." }, { key: "project", label: "Project" },
  { key: "workType", label: "Work Type", type: "select", options: workTypes },
  { key: "preparedBy", label: "Prepared By" }, { key: "approvingAuthority", label: "Approving Authority" },
  { key: "amount", label: "Amount" }, { key: "revision", label: "Revision" },
  { key: "preparedOn", label: "Prepared", type: "date" }, { key: "validTill", label: "Valid Till", type: "date" },
  { key: "status", label: "Status", type: "status", options: ["Draft","Submitted","Approved","Revised","Rejected"] },
];
const deptFields: ModuleField[] = [
  { key: "id", label: "ID" }, { key: "name", label: "Department" }, { key: "head", label: "Head" },
  { key: "contact", label: "Contact" }, { key: "station", label: "Station" },
  { key: "projects", label: "Projects", type: "number" }, { key: "budget", label: "Budget" },
  { key: "status", label: "Status", type: "status" },
];
const contractorFields: ModuleField[] = [
  { key: "id", label: "ID" }, { key: "name", label: "Contractor" }, { key: "gstin", label: "GSTIN" },
  { key: "pan", label: "PAN" }, { key: "contactPerson", label: "Contact" }, { key: "phone", label: "Phone" },
  { key: "region", label: "Region" }, { key: "activeProjects", label: "Projects", type: "number" },
  { key: "rating", label: "Rating" }, { key: "status", label: "Status", type: "status" },
  { key: "onboarded", label: "Onboarded", type: "date" },
];
const woFields: ModuleField[] = [
  { key: "id", label: "WO No." }, { key: "project", label: "Project" },
  { key: "contractor", label: "Contractor" }, { key: "workType", label: "Work Type" },
  { key: "amount", label: "Amount" }, { key: "issuedBy", label: "Issued By" },
  { key: "issued", label: "Issued", type: "date" }, { key: "deadline", label: "Deadline", type: "date" },
  { key: "priority", label: "Priority" }, { key: "status", label: "Status", type: "status" },
];
const tenderFields: ModuleField[] = [
  { key: "id", label: "Tender No." }, { key: "title", label: "Title" }, { key: "department", label: "Department" },
  { key: "estimate", label: "Estimate" }, { key: "emd", label: "EMD" },
  { key: "publishedOn", label: "Published", type: "date" }, { key: "closeDate", label: "Closes", type: "date" },
  { key: "bidders", label: "Bidders", type: "number" }, { key: "awardedTo", label: "Awarded To" },
  { key: "status", label: "Status", type: "status" },
];
const mbFields: ModuleField[] = [
  { key: "id", label: "MB No." }, { key: "project", label: "Project" }, { key: "engineer", label: "Engineer" },
  { key: "workType", label: "Work Type" }, { key: "quantity", label: "Qty", type: "number" },
  { key: "unit", label: "Unit" }, { key: "rate", label: "Rate" }, { key: "amount", label: "Amount" },
  { key: "submitted", label: "Submitted", type: "date" }, { key: "status", label: "Status", type: "status" },
];
const billFields: ModuleField[] = [
  { key: "id", label: "Bill No." }, { key: "project", label: "Project" }, { key: "contractor", label: "Contractor" },
  { key: "billType", label: "Bill Type" }, { key: "amount", label: "Amount" }, { key: "gstAmount", label: "GST" },
  { key: "submitted", label: "Submitted", type: "date" }, { key: "payment", label: "Payment" },
  { key: "status", label: "Status", type: "status" },
];
const dprFields: ModuleField[] = [
  { key: "id", label: "DPR No." }, { key: "project", label: "Project" }, { key: "engineer", label: "Engineer" },
  { key: "date", label: "Date", type: "date" }, { key: "workDone", label: "Work Done" },
  { key: "progress", label: "Progress" }, { key: "workforce", label: "Workforce", type: "number" },
  { key: "weather", label: "Weather" }, { key: "status", label: "Status", type: "status" },
];
const smFields: ModuleField[] = [
  { key: "id", label: "Visit ID" }, { key: "project", label: "Project" }, { key: "location", label: "Location" },
  { key: "geo", label: "Geo-Tag" }, { key: "photos", label: "Photos", type: "number" },
  { key: "inspector", label: "Inspector" }, { key: "lastVisit", label: "Last Visit", type: "date" },
  { key: "status", label: "Status", type: "status" },
];
const docFields: ModuleField[] = [
  { key: "id", label: "Doc ID" }, { key: "name", label: "Name" }, { key: "project", label: "Project" },
  { key: "type", label: "Type" }, { key: "uploadedBy", label: "Uploaded By" },
  { key: "size", label: "Size" }, { key: "uploaded", label: "Date", type: "date" },
];
const notifFields: ModuleField[] = [
  { key: "id", label: "ID" }, { key: "title", label: "Title" }, { key: "type", label: "Type" },
  { key: "target", label: "Target" }, { key: "sender", label: "Sender" },
  { key: "sent", label: "Sent", type: "date" }, { key: "status", label: "Status", type: "status" },
];
const auditFields: ModuleField[] = [
  { key: "id", label: "Log ID" }, { key: "actor", label: "Actor" }, { key: "action", label: "Action" },
  { key: "entity", label: "Entity" }, { key: "ip", label: "IP" },
  { key: "device", label: "Device" }, { key: "timestamp", label: "Timestamp" },
];
const taskFields: ModuleField[] = [
  { key: "id", label: "Task ID" }, { key: "title", label: "Task" }, { key: "project", label: "Project" },
  { key: "assignedTo", label: "Assigned To" }, { key: "assignedBy", label: "Assigned By" },
  { key: "priority", label: "Priority" }, { key: "startDate", label: "Start", type: "date" },
  { key: "dueDate", label: "Due", type: "date" }, { key: "progress", label: "Progress" },
  { key: "status", label: "Status", type: "status", options: ["Assigned","In Progress","Submitted","Approved","On Hold"] },
];
const progressFields: ModuleField[] = [
  { key: "id", label: "Update ID" }, { key: "taskId", label: "Task" }, { key: "project", label: "Project" },
  { key: "engineer", label: "Engineer" }, { key: "workDescription", label: "Work Description" },
  { key: "progressPercent", label: "Progress" }, { key: "photosCount", label: "Photos", type: "number" },
  { key: "geoTag", label: "Geo-Tag" }, { key: "inspector", label: "Inspector" },
  { key: "remarks", label: "Remarks" }, { key: "submittedOn", label: "Submitted", type: "date" },
  { key: "status", label: "Status", type: "status" },
];

// ---------- module registry ----------
export const MODULES: Record<string, ModuleConfig> = {
  users:        { slug: "users", title: "User Management", icon: Users, fields: userFields, data: buildUsers() },
  admins:       { slug: "admins", title: "Admin Management", icon: ShieldCheck, fields: adminFields, data: buildAdmins() },
  engineers:    { slug: "engineers", title: "Engineer Management", icon: HardHat, fields: engFields, data: buildEngineers() },
  projects:     { slug: "projects", title: "Project Management", icon: FolderKanban, fields: projectFields, data: buildProjects() },
  estimates:    { slug: "estimates", title: "Estimate Management", icon: Calculator, fields: estimateFields, data: buildEstimates() },
  departments:  { slug: "departments", title: "Department Management", icon: Building2, fields: deptFields, data: buildDepartments() },
  contractors:  { slug: "contractors", title: "Contractor Management", icon: Briefcase, fields: contractorFields, data: buildContractors() },
  "work-orders":{ slug: "work-orders", title: "Work Orders", icon: ClipboardList, fields: woFields, data: buildWorkOrders() },
  tenders:      { slug: "tenders", title: "Tender Management", icon: FileText, fields: tenderFields, data: buildTenders() },
  tasks:        { slug: "tasks", title: "Task Assignment", icon: ListChecks, fields: taskFields, data: buildTasks() },
  mb:           { slug: "mb", title: "Measurement Book", icon: BookOpen, fields: mbFields, data: buildMB() },
  bills:        { slug: "bills", title: "Billing Management", icon: Receipt, fields: billFields, data: buildBills() },
  dpr:          { slug: "dpr", title: "Daily Progress Reports", icon: FileCheck2, fields: dprFields, data: buildDPR() },
  progress:     { slug: "progress", title: "Progress Updates (Photos)", icon: Camera, fields: progressFields, data: buildProgress() },
  monitoring:   { slug: "monitoring", title: "Site Monitoring", icon: MapPin, fields: smFields, data: buildSiteMonitoring() },
  documents:    { slug: "documents", title: "Documents", icon: FileInput, fields: docFields, data: buildDocuments() },
  reports:      { slug: "reports", title: "Reports & Analytics", icon: BarChart3, fields: projectFields, data: buildProjects() },
  notifications:{ slug: "notifications", title: "Notifications", icon: Bell, fields: notifFields, data: buildNotifications() },
  audit:        { slug: "audit", title: "Audit Logs", icon: Activity, fields: auditFields, data: buildAuditLogs() },
  settings:     { slug: "settings", title: "Settings", icon: Settings, fields: [], data: [] },
  profile:      { slug: "profile", title: "Profile", icon: UserCircle, fields: [], data: [] },
};

// ---------- sidebar definitions per role ----------
export const SIDEBARS: Record<Role, SidebarGroup[]> = {
  superadmin: [
    { label: "Dashboard", icon: LayoutDashboard, slug: "" },
    { label: "User Management", icon: Users, slug: "users" },
    { label: "Admin Management", icon: ShieldCheck, slug: "admins" },
    { label: "Engineer Management", icon: HardHat, slug: "engineers" },
    { label: "Project Management", icon: FolderKanban, slug: "projects" },
    { label: "Estimate Management", icon: Calculator, slug: "estimates" },
    { label: "Task Assignment", icon: ListChecks, slug: "tasks" },
    { label: "Departments", icon: Building2, slug: "departments" },
    { label: "Contractors", icon: Briefcase, slug: "contractors" },
    { label: "Work Orders", icon: ClipboardList, slug: "work-orders" },
    { label: "Tenders", icon: FileText, slug: "tenders" },
    { label: "Measurement Book", icon: BookOpen, slug: "mb" },
    { label: "Billing", icon: Receipt, slug: "bills" },
    { label: "Reports", icon: BarChart3, slug: "reports" },
    { label: "Notifications", icon: Bell, slug: "notifications" },
    { label: "Audit Logs", icon: Activity, slug: "audit" },
    { label: "Settings", icon: Settings, slug: "settings" },
    { label: "Profile", icon: UserCircle, slug: "profile" },
  ],
  admin: [
    { label: "Dashboard", icon: LayoutDashboard, slug: "" },
    { label: "Engineers", icon: HardHat, slug: "engineers" },
    { label: "Projects", icon: FolderKanban, slug: "projects" },
    { label: "Estimates", icon: Calculator, slug: "estimates" },
    { label: "Assign Tasks", icon: ListChecks, slug: "tasks" },
    { label: "Contractors", icon: Briefcase, slug: "contractors" },
    { label: "Work Orders", icon: ClipboardList, slug: "work-orders" },
    { label: "Measurement Book", icon: BookOpen, slug: "mb" },
    { label: "Billing", icon: Receipt, slug: "bills" },
    { label: "DPR", icon: FileCheck2, slug: "dpr" },
    { label: "Progress Updates", icon: Camera, slug: "progress" },
    { label: "Reports", icon: BarChart3, slug: "reports" },
    { label: "Notifications", icon: Bell, slug: "notifications" },
    { label: "Profile", icon: UserCircle, slug: "profile" },
  ],
  engineer: [
    { label: "Dashboard", icon: LayoutDashboard, slug: "" },
    { label: "My Tasks", icon: ListChecks, slug: "tasks" },
    { label: "Assigned Projects", icon: FolderKanban, slug: "projects" },
    { label: "Submit Progress", icon: Camera, slug: "submit-progress" },
    { label: "Progress History", icon: Camera, slug: "progress" },
    { label: "Daily Progress (DPR)", icon: FileCheck2, slug: "dpr" },
    { label: "Measurement Book", icon: BookOpen, slug: "mb" },
    { label: "Billing", icon: Receipt, slug: "bills" },
    { label: "Site Monitoring", icon: MapPin, slug: "monitoring" },
    { label: "Documents", icon: FileInput, slug: "documents" },
    { label: "Notifications", icon: Bell, slug: "notifications" },
    { label: "Profile", icon: UserCircle, slug: "profile" },
  ],
};

export function moduleBySlug(slug: string): ModuleConfig | undefined {
  return MODULES[slug];
}
