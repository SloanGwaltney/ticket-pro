import Link from "next/link";

export default function Navbar(props) {
	return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link href="#">
          <a className="navbar-brand">Navbar</a>
        </Link>
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		</button>

		<div className="collapse navbar-collapse" id="navbarSupportedContent">
			<ul className="navbar-nav mr-auto">
				<li className="nav-item">
					<Link href='/register'>
						<a className="nav-link">Register</a>
					</Link>
				</li>
			</ul>
		</div>
      </nav>
    </div>
  );
}