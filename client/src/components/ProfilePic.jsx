export function ProfilePic(props) {
    return (
        <div class="card">
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
