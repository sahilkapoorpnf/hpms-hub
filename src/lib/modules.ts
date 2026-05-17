import {
  LayoutDashboard, Users, ShieldCheck, HardHat, FolderKanban, Building2, Briefcase,
  ClipboardList, FileText, BookOpen, Receipt, BarChart3, Settings, Bell, UserCircle,
  FileCheck2, ImageIcon, MapPin, FileInput, Activity,
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
  slug: string;            // path slug, e.g. "users"
  title: string;
  icon: LucideIcon;
  description?: string;
  fields: ModuleField[];   // table columns + form fields
  data: Record<string, any>[];
};

export type SidebarGroup = {
  label: string;
  icon: LucideIcon;
  // either single (slug) link or nested children
  slug?: string;
  children?: { label: string; slug: string }[];
};

// ---------- mock data generators ----------
const names = ["Ravi Patel","Sneha Joshi","Arjun Mehta","Pooja Iyer","Vikram Singh","Neha Gupta","Karan Shah","Aisha Khan","Rohit Das","Meera Nair","Sandeep Rao","Divya Pillai","Manish Tiwari","Suresh Babu","Lata Reddy"];
const cities = ["Mumbai","Delhi","Bengaluru","Hyderabad","Pune","Chennai","Kolkata","Ahmedabad","Jaipur","Lucknow"];
const depts = ["PWD","Roads & Bridges","Water Resources","Urban Development","Rural Engineering","Health Infra","Power","Irrigation"];
const projectNames = ["Riverside Bridge","Metro Phase 4","Highway NH-48 Upgrade","Smart Water Grid","District Hospital Block","Solar Power Plant","Drainage Modernization","Heritage Plaza Restoration","Industrial Corridor","Coastal Embankment"];
const contractors = ["Larsen Build Co","Reliance Infra Ltd","Shapoorji Pallonji","Tata Projects","GMR Infra","HCC Construction","NCC Limited","KEC International","IRB Infrastructure","Dilip Buildcon"];

const statuses = ["Active","Inactive","Pending","Approved","Rejected","Completed","In Progress","On Hold"];
const pickStatus = (i: number) => statuses[i % statuses.length];
const pickPriority = (i: number) => ["High","Medium","Low"][i % 3];

const rand = (n: number) => Math.floor(Math.random() * n);
const dateAgo = (d: number) => new Date(Date.now() - d * 86400000).toISOString().slice(0, 10);

const buildUsers = (count = 24) =>
  Array.from({ length: count }, (_, i) => ({
    id: `USR-${1000 + i}`,
    name: names[i % names.length],
    email: `${names[i % names.length].toLowerCase().replace(/\s+/g, ".")}@hpms.gov`,
    role: ["SuperAdmin","Admin","Engineer","Viewer"][i % 4],
    department: depts[i % depts.length],
    status: ["Active","Active","Inactive","Active"][i % 4],
    joined: dateAgo(i * 7 + 5),
  }));

const buildEngineers = (count = 18) =>
  Array.from({ length: count }, (_, i) => ({
    id: `ENG-${2000 + i}`,
    name: names[i % names.length],
    email: `${names[i % names.length].toLowerCase().replace(/\s+/g, ".")}@hpms.gov`,
    specialization: ["Civil","Electrical","Mechanical","Structural"][i % 4],
    region: cities[i % cities.length],
    projects: 2 + (i % 6),
    status: i % 5 === 0 ? "On Leave" : "Active",
    joined: dateAgo(i * 10 + 14),
  }));

const buildAdmins = (count = 8) =>
  Array.from({ length: count }, (_, i) => ({
    id: `ADM-${3000 + i}`,
    name: names[i % names.length],
    email: `${names[i % names.length].toLowerCase().replace(/\s+/g, ".")}@hpms.gov`,
    department: depts[i % depts.length],
    region: cities[i % cities.length],
    status: i % 4 === 0 ? "Inactive" : "Active",
    joined: dateAgo(i * 20 + 30),
  }));

const buildProjects = (count = 20) =>
  Array.from({ length: count }, (_, i) => ({
    id: `PRJ-${5000 + i}`,
    name: projectNames[i % projectNames.length] + ` - Phase ${1 + (i % 4)}`,
    department: depts[i % depts.length],
    location: cities[i % cities.length],
    budget: `₹${(20 + i * 7).toFixed(0)} Cr`,
    progress: `${Math.min(100, 10 + i * 5)}%`,
    contractor: contractors[i % contractors.length],
    engineer: names[i % names.length],
    status: pickStatus(i),
    startDate: dateAgo(i * 12 + 60),
  }));

const buildDepartments = () =>
  depts.map((d, i) => ({
    id: `DEP-${100 + i}`,
    name: d,
    head: names[i % names.length],
    projects: 4 + i,
    budget: `₹${(120 + i * 35)} Cr`,
    status: "Active",
  }));

const buildContractors = (count = 14) =>
  Array.from({ length: count }, (_, i) => ({
    id: `CON-${4000 + i}`,
    name: contractors[i % contractors.length],
    gstin: `27AAACR${1000 + i}A1Z5`,
    contact: names[i % names.length],
    region: cities[i % cities.length],
    projects: 1 + (i % 5),
    status: i % 6 === 0 ? "Blacklisted" : "Active",
    onboarded: dateAgo(i * 25 + 90),
  }));

const buildWorkOrders = (count = 16) =>
  Array.from({ length: count }, (_, i) => ({
    id: `WO-${6000 + i}`,
    project: projectNames[i % projectNames.length],
    contractor: contractors[i % contractors.length],
    amount: `₹${(5 + i * 2).toFixed(2)} Cr`,
    issued: dateAgo(i * 8 + 10),
    priority: pickPriority(i),
    status: pickStatus(i),
  }));

const buildTenders = (count = 12) =>
  Array.from({ length: count }, (_, i) => ({
    id: `TND-${7000 + i}`,
    title: projectNames[i % projectNames.length] + " Tender",
    department: depts[i % depts.length],
    estimate: `₹${(15 + i * 4)} Cr`,
    closeDate: dateAgo(-1 * (i + 5)),
    bidders: 2 + (i % 7),
    status: ["Open","Closed","Awarded","Cancelled"][i % 4],
  }));

const buildMB = (count = 15) =>
  Array.from({ length: count }, (_, i) => ({
    id: `MB-${8000 + i}`,
    project: projectNames[i % projectNames.length],
    engineer: names[i % names.length],
    quantity: 100 + i * 12,
    amount: `₹${(2 + i * 0.4).toFixed(2)} Cr`,
    submitted: dateAgo(i * 4 + 2),
    status: ["Submitted","Verified","Approved","Rejected"][i % 4],
  }));

const buildBills = (count = 18) =>
  Array.from({ length: count }, (_, i) => ({
    id: `BIL-${9000 + i}`,
    project: projectNames[i % projectNames.length],
    contractor: contractors[i % contractors.length],
    amount: `₹${(3 + i * 0.7).toFixed(2)} Cr`,
    submitted: dateAgo(i * 6 + 3),
    payment: ["Pending","Processing","Paid","On Hold"][i % 4],
    status: ["Verified","Approved","Pending","Rejected"][i % 4],
  }));

const buildDPR = (count = 20) =>
  Array.from({ length: count }, (_, i) => ({
    id: `DPR-${11000 + i}`,
    project: projectNames[i % projectNames.length],
    engineer: names[i % names.length],
    date: dateAgo(i + 1),
    progress: `${Math.min(100, 5 + i * 4)}%`,
    workforce: 20 + (i % 30),
    status: ["Submitted","Reviewed","Approved","Pending"][i % 4],
  }));

const buildSiteMonitoring = (count = 12) =>
  Array.from({ length: count }, (_, i) => ({
    id: `SM-${12000 + i}`,
    project: projectNames[i % projectNames.length],
    location: cities[i % cities.length],
    geo: `${(18 + Math.random() * 10).toFixed(4)}, ${(72 + Math.random() * 10).toFixed(4)}`,
    photos: 3 + (i % 6),
    lastVisit: dateAgo(i * 2 + 1),
    status: ["On Track","Delayed","Issue","On Track"][i % 4],
  }));

const buildDocuments = (count = 16) =>
  Array.from({ length: count }, (_, i) => ({
    id: `DOC-${13000 + i}`,
    name: ["Site Plan","Soil Report","Tender Doc","Approval Letter","Photo Log"][i % 5] + ` v${1 + (i % 3)}.pdf`,
    project: projectNames[i % projectNames.length],
    uploadedBy: names[i % names.length],
    size: `${(0.5 + Math.random() * 8).toFixed(2)} MB`,
    uploaded: dateAgo(i * 3 + 2),
  }));

const buildNotifications = (count = 14) =>
  Array.from({ length: count }, (_, i) => ({
    id: `NTF-${14000 + i}`,
    title: ["New MB submitted","Bill approved","Project assigned","Tender awarded","DPR pending review"][i % 5],
    type: ["Info","Success","Warning","Action"][i % 4],
    target: ["You","All Admins","SuperAdmin","Engineer Team"][i % 4],
    sent: dateAgo(i + 1),
    status: i % 3 === 0 ? "Unread" : "Read",
  }));

const buildAuditLogs = (count = 25) =>
  Array.from({ length: count }, (_, i) => ({
    id: `LOG-${15000 + i}`,
    actor: names[i % names.length],
    action: ["Created","Updated","Deleted","Approved","Rejected","Login","Logout"][i % 7],
    entity: ["Project","User","Bill","MB","WorkOrder","Tender"][i % 6],
    ip: `10.0.${i % 250}.${(i * 7) % 250}`,
    timestamp: new Date(Date.now() - i * 3600_000).toISOString().slice(0, 16).replace("T", " "),
  }));

// ---------- field definitions ----------
const userFields: ModuleField[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role", type: "select", options: ["SuperAdmin","Admin","Engineer","Viewer"] },
  { key: "department", label: "Department", type: "select", options: depts },
  { key: "status", label: "Status", type: "status", options: ["Active","Inactive"] },
  { key: "joined", label: "Joined", type: "date" },
];
const engFields: ModuleField[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "specialization", label: "Specialization", type: "select", options: ["Civil","Electrical","Mechanical","Structural"] },
  { key: "region", label: "Region" },
  { key: "projects", label: "Projects", type: "number" },
  { key: "status", label: "Status", type: "status" },
  { key: "joined", label: "Joined", type: "date" },
];
const adminFields: ModuleField[] = [
  { key: "id", label: "ID" }, { key: "name", label: "Name" }, { key: "email", label: "Email" },
  { key: "department", label: "Department" }, { key: "region", label: "Region" },
  { key: "status", label: "Status", type: "status" }, { key: "joined", label: "Joined", type: "date" },
];
const projectFields: ModuleField[] = [
  { key: "id", label: "Project ID" }, { key: "name", label: "Name" },
  { key: "department", label: "Department" }, { key: "location", label: "Location" },
  { key: "budget", label: "Budget" }, { key: "progress", label: "Progress" },
  { key: "contractor", label: "Contractor" }, { key: "engineer", label: "Engineer" },
  { key: "status", label: "Status", type: "status" }, { key: "startDate", label: "Start", type: "date" },
];
const deptFields: ModuleField[] = [
  { key: "id", label: "ID" }, { key: "name", label: "Department" }, { key: "head", label: "Head" },
  { key: "projects", label: "Projects", type: "number" }, { key: "budget", label: "Budget" },
  { key: "status", label: "Status", type: "status" },
];
const contractorFields: ModuleField[] = [
  { key: "id", label: "ID" }, { key: "name", label: "Contractor" }, { key: "gstin", label: "GSTIN" },
  { key: "contact", label: "Contact" }, { key: "region", label: "Region" },
  { key: "projects", label: "Projects", type: "number" }, { key: "status", label: "Status", type: "status" },
  { key: "onboarded", label: "Onboarded", type: "date" },
];
const woFields: ModuleField[] = [
  { key: "id", label: "WO No." }, { key: "project", label: "Project" },
  { key: "contractor", label: "Contractor" }, { key: "amount", label: "Amount" },
  { key: "issued", label: "Issued", type: "date" }, { key: "priority", label: "Priority" },
  { key: "status", label: "Status", type: "status" },
];
const tenderFields: ModuleField[] = [
  { key: "id", label: "Tender No." }, { key: "title", label: "Title" }, { key: "department", label: "Department" },
  { key: "estimate", label: "Estimate" }, { key: "closeDate", label: "Closes", type: "date" },
  { key: "bidders", label: "Bidders", type: "number" }, { key: "status", label: "Status", type: "status" },
];
const mbFields: ModuleField[] = [
  { key: "id", label: "MB No." }, { key: "project", label: "Project" }, { key: "engineer", label: "Engineer" },
  { key: "quantity", label: "Quantity", type: "number" }, { key: "amount", label: "Amount" },
  { key: "submitted", label: "Submitted", type: "date" }, { key: "status", label: "Status", type: "status" },
];
const billFields: ModuleField[] = [
  { key: "id", label: "Bill No." }, { key: "project", label: "Project" }, { key: "contractor", label: "Contractor" },
  { key: "amount", label: "Amount" }, { key: "submitted", label: "Submitted", type: "date" },
  { key: "payment", label: "Payment" }, { key: "status", label: "Status", type: "status" },
];
const dprFields: ModuleField[] = [
  { key: "id", label: "DPR No." }, { key: "project", label: "Project" }, { key: "engineer", label: "Engineer" },
  { key: "date", label: "Date", type: "date" }, { key: "progress", label: "Progress" },
  { key: "workforce", label: "Workforce", type: "number" }, { key: "status", label: "Status", type: "status" },
];
const smFields: ModuleField[] = [
  { key: "id", label: "Visit ID" }, { key: "project", label: "Project" }, { key: "location", label: "Location" },
  { key: "geo", label: "Geo-Tag" }, { key: "photos", label: "Photos", type: "number" },
  { key: "lastVisit", label: "Last Visit", type: "date" }, { key: "status", label: "Status", type: "status" },
];
const docFields: ModuleField[] = [
  { key: "id", label: "Doc ID" }, { key: "name", label: "Name" }, { key: "project", label: "Project" },
  { key: "uploadedBy", label: "Uploaded By" }, { key: "size", label: "Size" },
  { key: "uploaded", label: "Date", type: "date" },
];
const notifFields: ModuleField[] = [
  { key: "id", label: "ID" }, { key: "title", label: "Title" }, { key: "type", label: "Type" },
  { key: "target", label: "Target" }, { key: "sent", label: "Sent", type: "date" },
  { key: "status", label: "Status", type: "status" },
];
const auditFields: ModuleField[] = [
  { key: "id", label: "Log ID" }, { key: "actor", label: "Actor" }, { key: "action", label: "Action" },
  { key: "entity", label: "Entity" }, { key: "ip", label: "IP" }, { key: "timestamp", label: "Timestamp" },
];

// ---------- module registry ----------
export const MODULES: Record<string, ModuleConfig> = {
  users:        { slug: "users", title: "User Management", icon: Users, fields: userFields, data: buildUsers() },
  admins:       { slug: "admins", title: "Admin Management", icon: ShieldCheck, fields: adminFields, data: buildAdmins() },
  engineers:    { slug: "engineers", title: "Engineer Management", icon: HardHat, fields: engFields, data: buildEngineers() },
  projects:     { slug: "projects", title: "Project Management", icon: FolderKanban, fields: projectFields, data: buildProjects() },
  departments:  { slug: "departments", title: "Department Management", icon: Building2, fields: deptFields, data: buildDepartments() },
  contractors:  { slug: "contractors", title: "Contractor Management", icon: Briefcase, fields: contractorFields, data: buildContractors() },
  "work-orders":{ slug: "work-orders", title: "Work Orders", icon: ClipboardList, fields: woFields, data: buildWorkOrders() },
  tenders:      { slug: "tenders", title: "Tender Management", icon: FileText, fields: tenderFields, data: buildTenders() },
  mb:           { slug: "mb", title: "Measurement Book", icon: BookOpen, fields: mbFields, data: buildMB() },
  bills:        { slug: "bills", title: "Billing Management", icon: Receipt, fields: billFields, data: buildBills() },
  dpr:          { slug: "dpr", title: "Daily Progress Reports", icon: FileCheck2, fields: dprFields, data: buildDPR() },
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
    { label: "Contractors", icon: Briefcase, slug: "contractors" },
    { label: "Work Orders", icon: ClipboardList, slug: "work-orders" },
    { label: "Measurement Book", icon: BookOpen, slug: "mb" },
    { label: "Billing", icon: Receipt, slug: "bills" },
    { label: "DPR", icon: FileCheck2, slug: "dpr" },
    { label: "Reports", icon: BarChart3, slug: "reports" },
    { label: "Notifications", icon: Bell, slug: "notifications" },
    { label: "Profile", icon: UserCircle, slug: "profile" },
  ],
  engineer: [
    { label: "Dashboard", icon: LayoutDashboard, slug: "" },
    { label: "Assigned Projects", icon: FolderKanban, slug: "projects" },
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
