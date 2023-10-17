import React from "react";

const CardDetail = () => {
  return (
    <div class="card pmd-card user-info-card">
      <div class="card-header pmd-card-border d-flex flex-row align-items-center">
        <a class="pmd-avatar-list-img" href="javascript:void(0);">
          <img
            src="themes/images/profile-2.jpg"
            width="40"
            height="40"
            alt="Profile Picture"
          />
        </a>
        <div class="media-body">
          <h3 class="card-title">Darlene C. Larsen</h3>
          <p class="card-subtitle">Product Designer</p>
        </div>
        <div class="dropdown pmd-dropdown pmd-user-info ml-auto">
          <a
            href="javascript:void(0);"
            class="pmd-btn-fab btn-dark pmd-btn-flat btn btn-sm"
            data-toggle="dropdown"
            aria-expanded="true"
          >
            <i class="material-icons pmd-icon-sm">more_vert</i>
          </a>
          <div
            class="dropdown-menu dropdown-menu-right"
            style="clip: rect(0px, 151.55px, 0px, 151.55px); transform: translate3d(-111.55px, 0px, 0px);"
          >
            <a
              class="dropdown-item d-flex flex-row align-items-center"
              href="employee-detail.html"
            >
              <i class="material-icons md-dark pmd-icon-sm mr-3">edit</i>
              <span class="media-body">Edit</span>
            </a>
            <a
              href="javascript:void(0);"
              title="Delete"
              class="dropdown-item d-flex flex-row align-items-center"
              data-toggle="modal"
              data-target="#delete_employee_modal"
            >
              <i class="material-icons md-dark pmd-icon-sm mr-3">delete</i>
              <span class="media-body">Delete</span>
            </a>
          </div>
        </div>
      </div>

      <ul class="list-group pmd-list">
        <li class="list-group-item d-flex flex-row">
          <i class="material-icons pmd-list-icon align-self-center pmd-md md-dark">
            person_outline
          </i>
          <div class="media-body">
            <label class="pmd-list-subtitle">Employee ID</label>
            <p class="pmd-list-title">XYZ-1005</p>
          </div>
        </li>
        <li class="list-group-item d-flex flex-row">
          <i class="material-icons pmd-list-icon align-self-center pmd-md md-dark">
            call
          </i>
          <div class="media-body">
            <label class="pmd-list-subtitle mb-0">Phone No.</label>
            <p class="pmd-list-title">+91 98250 98250</p>
          </div>
        </li>
        <li class="list-group-item d-flex flex-row">
          <i class="material-icons pmd-list-icon align-self-center pmd-md md-dark">
            mail_outline
          </i>
          <div class="media-body">
            <label class="pmd-list-subtitle">Email Address</label>
            <p class="pmd-list-title">
              <a href="mailto:darlene@xyz.com">darlene@xyz.com</a>
            </p>
          </div>
        </li>
        <li class="list-group-item d-flex flex-row">
          <i class="material-icons pmd-list-icon align-self-center pmd-md md-dark">
            people_outline
          </i>
          <div class="media-body">
            <label class="pmd-list-subtitle">Department</label>
            <p class="pmd-list-title">Design</p>
          </div>
        </li>
        <li class="list-group-item d-flex flex-row">
          <i class="material-icons pmd-list-icon align-self-center pmd-md md-dark">
            today
          </i>
          <div class="media-body">
            <label class="pmd-list-subtitle">Date of Joining</label>
            <p class="pmd-list-title">
              25<sup>th</sup> February, 2018
            </p>
          </div>
        </li>
      </ul>

      <div class="card-footer pmd-card-border">
        <a
          title="View More"
          href="employee-detail.html"
          class="btn pmd-btn-flat pmd-ripple-effect btn-primary"
        >
          View More
        </a>
      </div>
    </div>
  );
};

export default CardDetail;