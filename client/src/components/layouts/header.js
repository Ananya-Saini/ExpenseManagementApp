import React from 'react'

const Header = () => {
  return (
    <>
        <nav classname="navbar navbar-expand-lg bg-body-tertiary">
  <div classname="container-fluid">
    <button classname="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span classname="navbar-toggler-icon">
      </span></button>
    <div classname="collapse navbar-collapse" id="navbarTogglerDemo01">
      <a classname="navbar-brand" href="#">Expense Management</a>
      <ul classname="navbar-nav ms-auto mb-2 mb-lg-0">
        <li classname="nav-item">
          <a classname="nav-link active" aria-current="page" href="#">Home</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

    </>
  )
}

export default Header