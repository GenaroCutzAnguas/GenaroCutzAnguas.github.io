/* Content that changes with the selected profile. */
window.PROFILE_DATA={
  data:{
    title:"Genaro Cutz · Data Engineer",
    dag:{done:"dag_run state=success",tasks:[
      ["ingest","FetchS3Object: Parquet files pulled from S3 / MinIO"],
      ["validate","Pytest suites + SQL quality rules passed"],
      ["transform","Airflow DAGs refactored, static analysis findings resolved"],
      ["publish","Governed dataset published to PostgreSQL"]]},
    stack:[
      {n:"Bronze",c:"var(--bronze)",d:"Raw. Where data lands. I pull files in and keep them as they arrived.",t:[["S3 / MinIO","Object storage for lake files, in the cloud or self-hosted."],["Parquet","Columnar file format that is compact and fast to query."],["Apache NiFi","Visual tool to route, transform and move data between systems."],["Docker Compose","Runs multi-container environments from a single file."],["Bash","Shell scripting to automate server and file tasks."]]},
      {n:"Silver",c:"var(--silver)",d:"Refined. Where data is cleaned, orchestrated and tested.",t:[["Apache Airflow","Schedules and monitors workflows written as Python DAGs."],["ETL / ELT","Extract, transform and load data, in either order."],["Pytest","Python testing framework I use to verify pipelines and DAGs."],["Python","My main language for pipelines, tests and automation."],["SQL","Query language for validating and shaping data."],["Data quality validation","Automated SQL rules that check data is complete and consistent."],["DuckDB","Fast in-process analytical database for local SQL queries."]]},
      {n:"Gold",c:"var(--gold)",d:"Trusted. Where data is governed, documented and ready to query.",t:[["Trino / Presto","Distributed SQL engine that queries data where it lives."],["Apache Iceberg","Open table format that adds reliable tables on top of lake files."],["PostgreSQL","Open source relational database."],["Metadata catalogs","Searchable inventory that describes what each dataset is."],["Medallion architecture","Bronze, Silver and Gold layers that refine data step by step."],["Power BI","Dashboards and automated reports for business metrics."]]},
      {n:"Platform",c:"var(--ink)",d:"Foundation. What everything runs on.",t:[["Linux (Debian, Kali)","Operating systems I use for servers and tooling."],["Server maintenance","Regular updates and upkeep of Linux servers."],["Git","Version control for code and teamwork."],["Jira","Agile tracking of sprints, tickets and issues."],["SQL Server","Microsoft relational database system."],["NoSQL","Non-relational databases for flexible or large-scale data."]]}]
  },
  software:{
    title:"Genaro Cutz · Software Engineer",
    dag:{done:"pipeline state=success",tasks:[
      ["analyze","Static analysis findings from SonarQube resolved"],
      ["build","Containerized environment built with Docker"],
      ["test","Pytest unit and integration suites passed"],
      ["release","Code ready for a production release"]]},
    stack:[
      {n:"Backend",c:"var(--bronze)",d:"The services and data access behind an application.",t:[["C#","Used to build backend services."],["Java","General-purpose object-oriented language."],["Python","Scripts, services and tests."],["SQL","Queries and data handling for applications."],["SQL Server","Microsoft relational database system."],["PostgreSQL","Open source relational database."]]},
      {n:"Quality",c:"var(--silver)",d:"Code that is tested, reviewed and easy to change.",t:[["Pytest","Python testing framework for unit and integration tests."],["SonarQube","Static analysis. I resolved its findings in production code."],["Refactoring","Cleaning up execution logic without changing behavior."],["Git","Version control for code and teamwork."]]},
      {n:"Delivery",c:"var(--gold)",d:"Getting software running, and keeping it running.",t:[["Docker Compose","Runs multi-container environments from a single file."],["Linux (Debian, Kali)","Operating systems I use for servers and tooling."],["Bash","Shell scripting to automate server and file tasks."],["Server maintenance","Regular updates and upkeep of Linux servers."],["Apache Airflow","Workflow scheduler. I maintained enterprise DAGs."],["Jira","Agile tracking of sprints, tickets and issues."]]},
      {n:"Frontend & 3D",c:"var(--ink)",d:"What people see. This page is the proof.",t:[["HTML / CSS","The foundation of web pages and their styling."],["JavaScript","Interactivity, animation and the logic of this page."],["Three.js","3D graphics in the browser. The scene above is built with it."]]}]
  }
};