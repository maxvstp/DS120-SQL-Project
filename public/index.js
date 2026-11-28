// Starter DMPCS sample dataset structured to match schema.sql tables
const INITIAL_THESES = [
  {
    thesis_id: 1,
    status_name: "Completed",
    stage_name: "Final Defense",
    academic_year: "2025-2026",
    semester: "2nd Semester",
    submission_date: "2026-05-18",
    title: "Spatiotemporal Forecasting of Dengue Incidence in Davao City Using Ensemble Machine Learning Models",
    abstract: "This study develops an ensemble predictive framework combining Random Forest and XGBoost algorithms with meteorological and historical barangay-level epidemiological records in Davao City to forecast dengue outbreaks up to four weeks ahead.",
    program_name: "BS Data Science",
    research_area_name: "Epidemiological Modeling & Health Informatics",
    topics: ["Disease Forecasting", "Public Health Analytics"],
    methodologies: ["Random Forest", "XGBoost", "Time-Series Cross-Validation"],
    keywords: ["dengue", "Davao City", "machine learning", "forecasting"],
    students: [
      { first_name: "Andrea", last_name: "Mendoza", program_name: "BS Data Science", email: "amendoza@up.edu.ph" },
      { first_name: "Rafael", last_name: "Villanueva", program_name: "BS Data Science", email: "rvillanueva@up.edu.ph" }
    ],
    faculty: [
      { first_name: "Gracie Anne", last_name: "Abot", role_name: "Adviser" },
      { first_name: "Vicente", last_name: "Calag", role_name: "Panel Member" }
    ]
  },
  {
    thesis_id: 2,
    status_name: "Completed",
    stage_name: "Final Defense",
    academic_year: "2025-2026",
    semester: "2nd Semester",
    submission_date: "2026-05-20",
    title: "Optimal Routing and Fleet Allocation for Solid Waste Collection in Mintal, Davao City Using Mixed-Integer Linear Programming",
    abstract: "We formulate a capacitated vehicle routing model with time windows to minimize total travel distance and fuel consumption for municipal waste collection trucks operating in Barangay Mintal.",
    program_name: "BS Applied Mathematics",
    research_area_name: "Operations Research & Optimization",
    topics: ["Vehicle Routing Problem", "Urban Logistics"],
    methodologies: ["Mixed-Integer Linear Programming", "Heuristic Optimization"],
    keywords: ["MILP", "routing", "optimization", "waste collection"],
    students: [
      { first_name: "Clarissa", last_name: "Bautista", program_name: "BS Applied Mathematics", email: "cbautista@up.edu.ph" }
    ],
    faculty: [
      { first_name: "May Anne", last_name: "Mata", role_name: "Adviser" },
      { first_name: "Ritchie", last_name: "Mae", role_name: "Panel Member" }
    ]
  },
  {
    thesis_id: 3,
    status_name: "Completed",
    stage_name: "Final Defense",
    academic_year: "2024-2025",
    semester: "2nd Semester",
    submission_date: "2025-05-22",
    title: "Automated Leaf Disease Classification for Cacao Crops in Mindanao Using Lightweight Convolutional Neural Networks",
    abstract: "This research evaluates MobileNetV3 and EfficientNet-Lite architectures deployed on mobile devices to assist smallholder farmers in Southern Mindanao in identifying Black Pod Rot and Frosty Pod Rot in real time.",
    program_name: "BS Computer Science",
    research_area_name: "Computer Vision & Precision Agriculture",
    topics: ["Plant Pathology Detection", "Edge AI"],
    methodologies: ["Convolutional Neural Networks", "Transfer Learning"],
    keywords: ["cacao", "computer vision", "CNN", "agriculture", "Mindanao"],
    students: [
      { first_name: "Miguel", last_name: "Soriano", program_name: "BS Computer Science", email: "msoriano@up.edu.ph" },
      { first_name: "Bianca", last_name: "Reyes", program_name: "BS Computer Science", email: "breyes@up.edu.ph" }
    ],
    faculty: [
      { first_name: "Armacheska", last_name: "Mesa", role_name: "Adviser" }
    ]
  },
  {
    thesis_id: 4,
    status_name: "Pending Verification",
    stage_name: "Final Defense",
    academic_year: "2026-2027",
    semester: "1st Semester",
    submission_date: "2026-11-20",
    title: "Sentiment and Topic Modeling of Public Transport Commuter Feedback in Davao City Using Transformer Embeddings",
    abstract: "Using BERTopic and fine-tuned Tagalog-English transformer models, this study analyzes social media discourse regarding Davao City public utility jeepney modernization and route transitions.",
    program_name: "BS Data Science",
    research_area_name: "Natural Language Processing",
    topics: ["Civic Sentiment Analysis", "Public Transportation"],
    methodologies: ["BERTopic", "Transformer Fine-Tuning"],
    keywords: ["NLP", "sentiment analysis", "public transport", "Davao"],
    students: [
      { first_name: "Kate Anjela", last_name: "Fernandez", program_name: "BS Data Science", email: "krfernandez@up.edu.ph" }
    ],
    faculty: [
      { first_name: "Gracie Anne", last_name: "Abot", role_name: "Adviser" }
    ]
  }
];

let theses = JSON.parse(localStorage.getItem("dmpcs_theses")) || INITIAL_THESES;

function saveTheses() {
  localStorage.setItem("dmpcs_theses", JSON.stringify(theses));
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 3200);
}

// TAB NAVIGATION
document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-btn").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".tab-section").forEach((sec) => sec.classList.remove("active"));

    btn.classList.add("active");
    const targetId = `tab-${btn.dataset.tab}`;
    document.getElementById(targetId).classList.add("active");

    refreshAllViews();
  });
});

// POPULATE FILTER DROPDOWNS
function populateFilters() {
  const approved = theses.filter((t) => t.status_name === "Completed");
  const areaSelect = document.getElementById("filter-area");
  const yearSelect = document.getElementById("filter-year");

  const currentArea = areaSelect.value;
  const currentYear = yearSelect.value;

  const areas = [...new Set(approved.map((t) => t.research_area_name))].sort();
  const years = [...new Set(approved.map((t) => t.academic_year))].sort().reverse();

  areaSelect.innerHTML = `<option value="all">All Research Areas</option>` +
    areas.map((a) => `<option value="${a}">${a}</option>`).join("");

  yearSelect.innerHTML = `<option value="all">All Academic Years</option>` +
    years.map((y) => `<option value="${y}">${y}</option>`).join("");

  areaSelect.value = areas.includes(currentArea) ? currentArea : "all";
  yearSelect.value = years.includes(currentYear) ? currentYear : "all";
}

function getProgramClass(programName) {
  if (programName === "BS Computer Science") return "program-bscs";
  if (programName === "BS Applied Mathematics") return "program-bsam";
  if (programName === "BS Data Science") return "program-bsds";
  return "";
}

// RENDER APPROVED THESES IN REPOSITORY
function renderRepository() {
  const query = document.getElementById("search-query").value.trim().toLowerCase();
  const program = document.getElementById("filter-program").value;
  const area = document.getElementById("filter-area").value;
  const year = document.getElementById("filter-year").value;

  const approved = theses.filter((t) => t.status_name === "Completed");

  const filtered = approved.filter((t) => {
    const matchesProgram = program === "all" || t.program_name === program;
    const matchesArea = area === "all" || t.research_area_name === area;
    const matchesYear = year === "all" || t.academic_year === year;

    const searchableText = [
      t.title,
      t.abstract,
      t.research_area_name,
      ...(t.keywords || []),
      ...(t.topics || []),
      ...t.students.map((s) => `${s.first_name} ${s.last_name}`),
      ...t.faculty.map((f) => `${f.first_name} ${f.last_name}`)
    ].join(" ").toLowerCase();

    const matchesQuery = !query || searchableText.includes(query);
    return matchesProgram && matchesArea && matchesYear && matchesQuery;
  });

  document.getElementById("results-count").textContent =
    `Showing ${filtered.length} Archived ${filtered.length === 1 ? "Thesis" : "Theses"}`;

  const grid = document.getElementById("thesis-grid");
  if (filtered.length === 0) {
    grid.innerHTML = `<div class="card"><p class="muted-text">No archived theses match your filter criteria.</p></div>`;
    return;
  }

  grid.innerHTML = filtered.map((t) => {
    const authors = t.students.map((s) => `${s.first_name} ${s.last_name}`).join(", ");
    const adviser = t.faculty.find((f) => f.role_name === "Adviser");
    const adviserName = adviser ? `${adviser.first_name} ${adviser.last_name}` : "N/A";

    return `
      <article class="thesis-card" onclick="openThesisModal(${t.thesis_id})">
        <div>
          <div class="card-top-meta">
            <span class="program-pill ${getProgramClass(t.program_name)}">${t.program_name}</span>
            <span class="year-pill">A.Y. ${t.academic_year}</span>
          </div>
          <h4>${t.title}</h4>
          <p class="thesis-snippet">${t.abstract}</p>
        </div>
        <div class="thesis-footer">
          <span><strong>Authors:</strong> ${authors}</span>
          <span><strong>Adviser:</strong> ${adviserName}</span>
          <span><strong>Area:</strong> ${t.research_area_name}</span>
        </div>
      </article>
    `;
  }).join("");
}

["search-query", "filter-program", "filter-area", "filter-year"].forEach((id) => {
  document.getElementById(id).addEventListener("input", renderRepository);
  document.getElementById(id).addEventListener("change", renderRepository);
});

// TOPIC UNIQUENESS / DUPLICATE CHECKER
document.getElementById("check-uniqueness-btn").addEventListener("click", () => {
  const input = document.getElementById("uniqueness-input").value.trim().toLowerCase();
  const resultBox = document.getElementById("uniqueness-result");
  const clearBtn = document.getElementById("clear-uniqueness-btn");

  if (!input) {
    showToast("Enter a proposed title or keywords first.");
    return;
  }

  const stopWords = new Set(["the", "and", "for", "with", "using", "in", "of", "to", "a", "an", "on"]);
  const words = input.split(/\W+/).filter((w) => w.length > 2 && !stopWords.has(w));

  const matches = theses.filter((t) => {
    const haystack = `${t.title} ${t.abstract} ${(t.keywords || []).join(" ")}`.toLowerCase();
    const overlapCount = words.filter((w) => haystack.includes(w)).length;
    return overlapCount >= Math.max(1, Math.ceil(words.length * 0.4));
  });

  resultBox.classList.remove("hidden", "uniqueness-clear", "uniqueness-warn");
  clearBtn.classList.remove("hidden");

  if (matches.length === 0) {
    resultBox.classList.add("uniqueness-clear");
    resultBox.innerHTML = `<strong>No direct overlap found!</strong> No existing DMPCS thesis closely matches those terms. You may proceed to consult your adviser.`;
  } else {
    resultBox.classList.add("uniqueness-warn");
    resultBox.innerHTML = `
      <strong>Potential Overlap Found (${matches.length} related ${matches.length === 1 ? "study" : "studies"}):</strong>
      <ul style="margin-top:0.4rem; padding-left:1.2rem;">
        ${matches.map((m) => `<li><strong>${m.title}</strong> (${m.program_name}, A.Y. ${m.academic_year})</li>`).join("")}
      </ul>
    `;
  }
});

document.getElementById("clear-uniqueness-btn").addEventListener("click", () => {
  document.getElementById("uniqueness-input").value = "";
  document.getElementById("uniqueness-result").classList.add("hidden");
  document.getElementById("clear-uniqueness-btn").classList.add("hidden");
});

// DYNAMIC AUTHOR & FACULTY ROWS IN SUBMISSION FORM
document.getElementById("add-author-btn").addEventListener("click", () => {
  const container = document.getElementById("authors-container");
  const row = document.createElement("div");
  row.className = "dynamic-row author-row";
  row.innerHTML = `
    <div class="form-group">
      <label>First Name <span class="req">*</span></label>
      <input type="text" name="author_first_name[]" required>
    </div>
    <div class="form-group">
      <label>Last Name <span class="req">*</span></label>
      <input type="text" name="author_last_name[]" required>
    </div>
    <div class="form-group">
      <label>Degree Program <span class="req">*</span></label>
      <select name="author_program[]" required>
        <option value="BS Computer Science">BS Computer Science</option>
        <option value="BS Applied Mathematics">BS Applied Mathematics</option>
        <option value="BS Data Science">BS Data Science</option>
      </select>
    </div>
    <div class="form-group">
      <label>UP Email (Optional)</label>
      <input type="email" name="author_email[]">
    </div>
    <button type="button" class="btn btn-sm btn-reject" onclick="this.parentElement.remove()">Remove</button>
  `;
  container.appendChild(row);
});

document.getElementById("add-faculty-btn").addEventListener("click", () => {
  const container = document.getElementById("faculty-container");
  const row = document.createElement("div");
  row.className = "dynamic-row faculty-row";
  row.innerHTML = `
    <div class="form-group">
      <label>Faculty First Name <span class="req">*</span></label>
      <input type="text" name="faculty_first_name[]" required>
    </div>
    <div class="form-group">
      <label>Faculty Last Name <span class="req">*</span></label>
      <input type="text" name="faculty_last_name[]" required>
    </div>
    <div class="form-group">
      <label>Committee Role <span class="req">*</span></label>
      <select name="faculty_role[]" required>
        <option value="Panel Member" selected>Panel Member</option>
        <option value="Co-Adviser">Co-Adviser</option>
        <option value="Adviser">Adviser</option>
      </select>
    </div>
    <button type="button" class="btn btn-sm btn-reject" onclick="this.parentElement.remove()">Remove</button>
  `;
  container.appendChild(row);
});

// HANDLE THESIS SUBMISSION
document.getElementById("thesis-submit-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;

  const firstNames = [...form.querySelectorAll('[name="author_first_name[]"]')].map((i) => i.value.trim());
  const lastNames = [...form.querySelectorAll('[name="author_last_name[]"]')].map((i) => i.value.trim());
  const programs = [...form.querySelectorAll('[name="author_program[]"]')].map((i) => i.value);
  const emails = [...form.querySelectorAll('[name="author_email[]"]')].map((i) => i.value.trim());

  const students = firstNames.map((fn, idx) => ({
    first_name: fn,
    last_name: lastNames[idx],
    program_name: programs[idx],
    email: emails[idx] || null
  }));

  const facFirst = [...form.querySelectorAll('[name="faculty_first_name[]"]')].map((i) => i.value.trim());
  const facLast = [...form.querySelectorAll('[name="faculty_last_name[]"]')].map((i) => i.value.trim());
  const facRoles = [...form.querySelectorAll('[name="faculty_role[]"]')].map((i) => i.value);

  const faculty = facFirst.map((fn, idx) => ({
    first_name: fn,
    last_name: facLast[idx],
    role_name: facRoles[idx]
  }));

  const splitTags = (val) => val.split(",").map((s) => s.trim()).filter(Boolean);

  const newThesis = {
    thesis_id: Date.now(),
    status_name: "Pending Verification",
    stage_name: document.getElementById("thesis-stage").value,
    academic_year: document.getElementById("academic-year").value.trim(),
    semester: document.getElementById("semester").value,
    submission_date: document.getElementById("submission-date").value,
    title: document.getElementById("thesis-title").value.trim(),
    abstract: document.getElementById("thesis-abstract").value.trim(),
    program_name: students[0]?.program_name || "BS Computer Science",
    research_area_name: document.getElementById("research-area").value.trim(),
    topics: splitTags(document.getElementById("thesis-topics").value),
    methodologies: splitTags(document.getElementById("thesis-methodologies").value),
    keywords: splitTags(document.getElementById("thesis-keywords").value),
    students,
    faculty
  };

  theses.unshift(newThesis);
  saveTheses();
  form.reset();
  refreshAllViews();
  showToast("Submitted! Your thesis is now in the Admin Verification Queue.");
});

// RENDER ANALYTICS DASHBOARD
function renderAnalytics() {
  const approved = theses.filter((t) => t.status_name === "Completed");
  document.getElementById("kpi-total").textContent = approved.length;
  document.getElementById("kpi-bscs").textContent = approved.filter((t) => t.program_name === "BS Computer Science").length;
  document.getElementById("kpi-bsam").textContent = approved.filter((t) => t.program_name === "BS Applied Mathematics").length;
  document.getElementById("kpi-bsds").textContent = approved.filter((t) => t.program_name === "BS Data Science").length;

  const areaCounts = {};
  approved.forEach((t) => {
    areaCounts[t.research_area_name] = (areaCounts[t.research_area_name] || 0) + 1;
  });

  const maxCount = Math.max(1, ...Object.values(areaCounts));
  const areaBars = document.getElementById("area-bars");
  areaBars.innerHTML = Object.entries(areaCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([area, count]) => {
      const pct = Math.round((count / maxCount) * 100);
      return `
        <div>
          <div class="bar-item-header">
            <span>${area}</span>
            <span>${count} ${count === 1 ? "study" : "studies"}</span>
          </div>
          <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
        </div>
      `;
    }).join("") || `<p class="muted-text">No data available yet.</p>`;

  const methodCounts = {};
  approved.forEach((t) => {
    (t.methodologies || []).forEach((m) => {
      methodCounts[m] = (methodCounts[m] || 0) + 1;
    });
  });

  document.getElementById("methodology-tags").innerHTML = Object.entries(methodCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([m, c]) => `<span class="tag-chip">${m} (${c})</span>`)
    .join("") || `<p class="muted-text">No methodologies logged yet.</p>`;
}

// RENDER ADMIN VERIFICATION QUEUE
function renderAdminQueue() {
  const pendingCount = theses.filter((t) => t.status_name === "Pending Verification").length;
  document.getElementById("pending-badge").textContent = pendingCount;

  const tbody = document.getElementById("admin-queue-body");
  tbody.innerHTML = theses.map((t) => {
    const isPending = t.status_name === "Pending Verification";
    const authors = t.students.map((s) => `${s.first_name} ${s.last_name}`).join(", ");
    const adviser = t.faculty.find((f) => f.role_name === "Adviser");
    const adviserName = adviser ? `${adviser.first_name} ${adviser.last_name}` : "N/A";

    return `
      <tr>
        <td>
          <strong>${t.title}</strong>
          <div class="muted-text small">${t.abstract.slice(0, 110)}...</div>
        </td>
        <td><span class="program-pill ${getProgramClass(t.program_name)}">${t.program_name}</span></td>
        <td>${authors}</td>
        <td>${adviserName}</td>
        <td>${t.academic_year}</td>
        <td>
          <span class="status-pill ${isPending ? "status-pending" : "status-approved"}">
            ${t.status_name}
          </span>
        </td>
        <td>
          <div class="action-btns">
            ${isPending ? `<button class="btn btn-sm btn-approve" onclick="approveThesis(${t.thesis_id})">Approve</button>` : ""}
            <button class="btn btn-sm btn-reject" onclick="deleteThesis(${t.thesis_id})">Remove</button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

window.approveThesis = function (id) {
  const item = theses.find((t) => t.thesis_id === id);
  if (item) {
    item.status_name = "Completed";
    saveTheses();
    refreshAllViews();
    showToast("Thesis verified and published to the DMPCS archive!");
  }
};

window.deleteThesis = function (id) {
  theses = theses.filter((t) => t.thesis_id !== id);
  saveTheses();
  refreshAllViews();
  showToast("Entry removed from queue.");
};

// DETAIL MODAL
window.openThesisModal = function (id) {
  const t = theses.find((item) => item.thesis_id === id);
  if (!t) return;

  const modalBadge = document.getElementById("modal-program-badge");
  modalBadge.textContent = t.program_name;
  modalBadge.className = `program-pill ${getProgramClass(t.program_name)}`;

  document.getElementById("modal-title").textContent = t.title;
  document.getElementById("modal-meta").textContent =
    `A.Y. ${t.academic_year} (${t.semester}) • Stage: ${t.stage_name} • Date: ${t.submission_date || "N/A"}`;
  document.getElementById("modal-abstract").textContent = t.abstract;

  document.getElementById("modal-authors").innerHTML = t.students
    .map((s) => `<li>${s.first_name} ${s.last_name} (${s.program_name})</li>`)
    .join("");

  document.getElementById("modal-faculty").innerHTML = t.faculty
    .map((f) => `<li>${f.first_name} ${f.last_name} — <em>${f.role_name}</em></li>`)
    .join("");

  const allTags = [
    t.research_area_name,
    ...(t.topics || []),
    ...(t.methodologies || []),
    ...(t.keywords || [])
  ].filter(Boolean);

  document.getElementById("modal-tags").innerHTML = allTags
    .map((tag) => `<span class="tag-chip">${tag}</span>`)
    .join("");

  document.getElementById("thesis-modal").classList.remove("hidden");
};

document.getElementById("modal-close-btn").addEventListener("click", () => {
  document.getElementById("thesis-modal").classList.add("hidden");
});
document.getElementById("modal-close-bg").addEventListener("click", () => {
  document.getElementById("thesis-modal").classList.add("hidden");
});

function refreshAllViews() {
  populateFilters();
  renderRepository();
  renderAnalytics();
  renderAdminQueue();
}

// INITIAL LOAD
refreshAllViews();