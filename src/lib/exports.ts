import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportToExcel<T extends Record<string, unknown>>(rows: T[], filename: string) {
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, `${filename}.xlsx`);
}

export function exportToPDF<T extends Record<string, unknown>>(rows: T[], filename: string, title?: string) {
  const doc = new jsPDF({ orientation: "landscape" });
  if (title) {
    doc.setFontSize(14);
    doc.text(title, 14, 14);
  }
  const head = rows.length ? [Object.keys(rows[0])] : [[]];
  const body = rows.map((r) => Object.values(r).map((v) => (v == null ? "" : String(v))));
  autoTable(doc, { head, body, startY: 20, styles: { fontSize: 8 }, headStyles: { fillColor: [29, 41, 81] } });
  doc.save(`${filename}.pdf`);
}
