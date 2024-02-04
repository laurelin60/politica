import PropTypes from "prop-types";

function Tag({ tagName }: { tagName: string }) {
    return <div className="tag">{tagName}</div>;
}

Tag.propTypes = {
    tagName: PropTypes.string.isRequired,
};

export default Tag;
