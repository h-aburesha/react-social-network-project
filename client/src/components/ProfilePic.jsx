export function ProfilePic(props) {
    return (
        <div className="card">
            <img
                src="..//Red-berry-jam-isolated-on-transparent-background-PNG.png"
                alt="Image"
            />
            <div className="card-text">
                <h6>{props.name}</h6>
            </div>
        </div>
    );
}
