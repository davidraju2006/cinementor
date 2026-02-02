import express from "express";
import PDFDocument from "pdfkit";

const router = express.Router();

router.post("/pdf", (req, res) => {
  const { shots, projectTitle = "Shot List" } = req.body;

  if (!shots || !Array.isArray(shots)) {
    return res.status(400).json({ error: "Invalid shot list" });
  }

  const doc = new PDFDocument({ margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${projectTitle.replace(/\s+/g, "_")}_Shot_List.pdf"`
  );

  doc.pipe(res);

  // Title
  doc.fontSize(20).text(projectTitle, { align: "center" });
  doc.moveDown();

  shots.forEach((shot, index) => {
    doc
      .fontSize(14)
      .text(`${index + 1}. ${shot.title}`, { underline: true });

    doc.fontSize(11).text(`Camera: ${shot.camera}`);
    doc.text(`Description: ${shot.description}`);
    doc.text(`Purpose: ${shot.purpose}`);
    doc.moveDown();
  });

  doc.end();
});

router.post("/csv", (req, res) => {
  const { shots, projectTitle = "Shot List" } = req.body;

  if (!shots || !Array.isArray(shots)) {
    return res.status(400).json({ error: "Invalid shot list" });
  }

  const headers = ["Shot No", "Title", "Camera", "Description", "Purpose"];
  const rows = shots.map((shot, i) => [
    i + 1,
    shot.title,
    shot.camera,
    shot.description,
    shot.purpose
  ]);

  const csv =
    headers.join(",") +
    "\n" +
    rows.map((r) => r.map(v => `"${v}"`).join(",")).join("\n");

  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${projectTitle.replace(/\s+/g, "_")}_Shot_List.csv"`
  );

  res.send(csv);
});

export default router;
