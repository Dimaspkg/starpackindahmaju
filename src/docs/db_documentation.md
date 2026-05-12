# Database Documentation: Starpack Lead Management

This document provides technical details for the MySQL database used to store and manage customer inquiries (leads) for the PT. Starpack Indahmaju website.

## 1. Overview
The database system is designed to capture, store, and track potential customer inquiries submitted through the contact form. It serves as the backbone for the Admin Dashboard located at `/admin`.

## 2. Connection Configuration
The application connects to MySQL using a connection pool managed in `src/lib/db.ts`.

### Environment Variables
Required variables in `.env.local`:
| Variable | Description | Example |
| :--- | :--- | :--- |
| `MYSQL_HOST` | Database host address | `localhost` |
| `MYSQL_USER` | Database username | `root` |
| `MYSQL_PASSWORD` | Database password | `your_password` |
| `MYSQL_DATABASE` | Database name | `starpack_db` |

---

## 3. Database Schema: `leads` Table
This is the primary table used for storing user inquiries.

### SQL Definition
```sql
CREATE TABLE IF NOT EXISTS leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  interest VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  status ENUM('new', 'contacted', 'qualified', 'closed') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Field Descriptions
| Field | Type | Null | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `id` | INT | NO | AUTO_INC | Unique identifier for each lead. |
| `name` | VARCHAR(255) | NO | | Full name of the inquirer. |
| `company` | VARCHAR(255) | YES | NULL | Company name of the inquirer. |
| `email` | VARCHAR(255) | NO | | Contact email address. |
| `interest` | VARCHAR(100) | NO | | Service of interest (e.g., 'uv', 'vacuum', 'both'). |
| `message` | TEXT | NO | | Detailed message or inquiry from the user. |
| `status` | ENUM | NO | 'new' | Pipeline status: `new`, `contacted`, `qualified`, `closed`. |
| `created_at` | TIMESTAMP | NO | CURRENT_TIMESTAMP | Timestamp when the lead was submitted. |
| `updated_at` | TIMESTAMP | NO | CURRENT_TIMESTAMP | Timestamp of the last update to the lead. |

---

## 4. Common Queries

### Fetching All Leads (Newest First)
```sql
SELECT * FROM leads ORDER BY created_at DESC;
```

### Updating Lead Status
```sql
UPDATE leads SET status = 'contacted' WHERE id = 1;
```

### Deleting a Lead
```sql
DELETE FROM leads WHERE id = 1;
```

---

## 5. Maintenance & Backup
- **Backups**: It is recommended to perform daily backups using `mysqldump`.
- **Indexing**: Currently, the `id` and `created_at` are sufficient for performance. As the database grows, adding an index to `email` might be beneficial for searching.
