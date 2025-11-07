## Standard Task Workflow Protocol

This protocol outlines the mandatory, step-by-step process for implementing any change in the project. Adhering to this workflow ensures code quality, prevents regressions, maintains a clean history, and automates the release and deployment cycle.

### Phase 1: Preparation & Branching

**Goal:** To create a clean, isolated environment for your changes, based on the latest version of the project.

1.  **Synchronize Your Local `main` Branch:**
    Before starting any new work, ensure your local `main` branch is perfectly in sync with the remote repository on GitHub.

    ```bash
    # In your macOS Terminal, navigate to the project directory

    # Switch to the main branch
    git checkout main

    # Pull the latest changes from the remote 'origin'
    git pull origin main
    ```

2.  **Create a New Feature Branch:**
    Create a new branch from `main`. The branch name must follow our conventional commit naming standard (`type/description`).

    ```bash
    # Examples of branch names:
    # feat/add-contact-form
    # fix/header-alignment-issue
    # docs/update-readme

    git checkout -b <type>/<descriptive-name>

    # Real example:
    git checkout -b feat/add-image-lightbox
    ```

### Phase 2: Development & Local Validation

**Goal:** To write the code and continuously verify its correctness on your local machine. This is an iterative loop.

1.  **Code the Changes:**
    Make all necessary code modifications in VS Code.

2.  **Visually Verify Your Work:**
    Run the local development server to see your changes in the browser.
    ```bash
    npm run dev
    ```
    Open `http://localhost:3000` and confirm the new feature or fix works as intended.

3.  **Run the Linter:**
    Check your code for any style or syntax issues.
    ```bash
    npm run lint
    ```
    Fix any errors or warnings that appear.

4.  **Run the Test Suite:**
    Ensure your changes have not broken any existing functionality (regressions).
    ```bash
    npm test
    ```
    All tests must pass before you proceed.

5.  **Repeat:** Continue this code-and-validate cycle until the feature is complete and all local checks are successful.

### Phase 3: Documentation Update

**Goal:** To ensure all project documentation accurately reflects the new changes. **Do not skip this step.**

1.  **Review and Update Relevant Documents:**
    Based on your changes, update any of the following files. **`CHANGELOG.md` is updated automatically later.**
    -   `README.md`: Does the project overview or feature list need updating?
    -   `ARCHITECTURE.md`: Did you change a core part of the system's architecture?
    -   `DESIGN-SYSTEM.md`: Did you introduce a new UI component or change a core style?
    -   `SETUP.md`: Does your change affect the deployment or setup process?
    -   `RUNBOOK.md`: Did you change a process name or a command that operators need to know?
    -   Any other relevant documentation.

### Phase 4: Code Review & Continuous Integration (CI)

**Goal:** To get your code into the `main` branch through a safe, automated, and reviewed process.

1.  **Commit Your Changes:**
    Stage all your changes and write a commit message that follows the [Conventional Commits](https://www.conventionalcommits.org/) standard.

    ```bash
    git add .
    git commit -m "feat(ui): add lightbox feature to project images"
    ```

2.  **Push Your Branch to GitHub:**
    ```bash
    git push origin feat/add-image-lightbox
    ```

3.  **Create a Pull Request (PR):**
    -   Go to the repository on GitHub.
    -   Click the "Compare & pull request" button for your new branch.
    -   Write a clear title and a description of the changes.
    -   Click "Create pull request".

4.  **Await Automated CI Checks:**
    The creation of the PR automatically triggers our `CI Pipeline`. It performs three checks:
    -   **Linter:** Verifies code style.
    -   **Tests:** Runs the full test suite.
    -   **Build:** Confirms the project builds successfully.
    The "Merge" button will be blocked until all checks pass.

5.  **Merge the Pull Request:**
    Once all checks are green, merge the PR into `main` using the **"Squash and merge"** option. This keeps our `main` branch history clean, with one commit per feature/fix.

### Phase 5: Release & Deployment

**Goal:** To create a new version of the project, update the changelog, and deploy it to production.

1.  **Sync Local `main` After Merging:**
    Before creating a release, switch back to `main` and pull the changes you just merged.

    ```bash
    git checkout main
    git pull origin main
    ```

2.  **Determine the Version Type:**
    Based on your changes, decide if this is a `patch`, `minor`, or `major` release.
    -   `patch`: For bug fixes and small improvements.
    -   `minor`: For new, backward-compatible features.
    -   `major`: For breaking changes.

3.  **Create the Release:**
    Run the release script. This will automatically update `package.json` and `CHANGELOG.md`, then create a commit and a git tag.

    ```bash
    # For a patch release (most common)
    npm run release -- --release-as patch

    # For a minor release
    npm run release -- --release-as minor

    # For a major release
    npm run release -- --release-as major
    ```

4.  **Push the Release to GitHub:**
    This command pushes the new commit and the new tag, which triggers the final steps.

    ```bash
    git push --follow-tags origin main
    ```

5.  **Monitor Automated Processes:**
    -   **GitHub Release:** A GitHub Actions workflow will automatically create a new Release on the repository page.
    -   **Deployment:** The merge to `main` will have already triggered the deployment workflow, which deploys the new version to the server.

### Phase 6: Cleanup

**Goal:** To keep the repository clean and tidy.

1.  **Delete the Remote Branch:**
    On the merged Pull Request page on GitHub, click the "Delete branch" button.

2.  **Delete the Local Branch:**
    ```bash
    # Ensure you are back on the main branch
    git checkout main

    # Delete the feature branch you were working on
    git branch -D feat/add-image-lightbox
    ```

This completes the entire lifecycle of a task. Following this process rigorously is the key to our project's stability and success.