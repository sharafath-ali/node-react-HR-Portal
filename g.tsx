<Navbar className="MainNavbar" expand="lg">
      <Container className="NavContainer" fluid>
        <img className="NavLogo" src={img} />
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
        </Navbar.Collapse>
      </Container>
</Navbar>