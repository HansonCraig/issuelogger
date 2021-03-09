document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
  const issueDesc = document.getElementById('issueDescInput').value;
  // const issuePriority = document.getElementById('issuePriorityInput').value;
  const issuePriority = document.querySelector('input[name="priority"]:checked').value;
  const issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  const issueID = chance.guid();
  const issueStatus = 'Open';
  const issueCreationTime = Date();

  const issue = {
    id: issueID,
    priority: issuePriority,
    assignedTo: issueAssignedTo,
    status: issueStatus,
    description: issueDesc,
    timeStamp: issueCreationTime
  }

  if (localStorage.getItem('issues') === null) {
    const issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    const issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  document.getElementById('issueInputForm').reset();

  fetchIssues();

  e.preventDefault();
}

function setStatusClosed(id) {
  const issues = JSON.parse(localStorage.getItem('issues'));

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id === id) {
      issues[i].status = 'Closed';
    } 
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

function deleteIssue(id) {
  const issues = JSON.parse(localStorage.getItem('issues'));

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id === id) {
      issues.splice(i, 1);
    }
}

localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

function fetchIssues() {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');

  issues.sort((a, b) => (b.priority > a.priority) ? 1: -1)
  issuesList.innerHTML = '';

  for (let i = 0; i < issues.length; i++) {
    const id = issues[i].id;
    const priority = issues[i].priority;
    const assignedTo = issues[i].assignedTo;
    const status = issues[i].status;
    const desc = issues[i].description;
    const timeStamp = issues[i].timeStamp;
    const issuesReport =  `
                            <div class="row">
                              <div class="col-sm-6">
                                <div class="card">
                                <h4><span class="created">Created:</span><br>
                                ${timeStamp}</h4>
                              <h4><span class="priority-assigned">Issue ID: </span><br>
                              <span class="id-style">${id}</span>
                            </h4>
                            <h3><span class="label label-info">
                              ${status}
                                </span></h3>
                                <br>
                            <h4><span class="glyphicon glyphicon-time">
                                </span><span class="priority-assigned"> Priority: </span><span class="id-style">${priority}</span></h4>
                            <h4><span class="glyphicon glyphicon-user"> 
                                </span><span class="priority-assigned">  Assigned to: </Span><span class="id-style">${assignedTo}</span></h4>
                                <br>
                            <a href="#" onclick="setStatusClosed('${id}')" class="btn btn-warning close-delete">
                                Close</a>
                            <a href="#" onclick="return confirm('Are you sure you want to delete this item?')(deleteIssue('${id}'))" class="btn btn-danger close-delete">Delete</a>
                                </div>
                                </div>
                                <div class="col-sm-6">
                                  <div class="card">
                           <h4 class="description-title">Description:</h4> 
                           <p class="description">
                                ${desc}</p>
                                  </div>
                                </div>
                            `
    issuesList.innerHTML += issuesReport;                             
  }
}
