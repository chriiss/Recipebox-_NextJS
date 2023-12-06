import "../../../styles/globals.scss"

const YouTubePreview = ({ videoId }) => {
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div>
            <iframe
                width="560"
                height="315"
                className="video_responsive"
                src={embedUrl}
                title="YouTube Video Preview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
}

export default YouTubePreview