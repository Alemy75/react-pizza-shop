import React from "react"
import ContentLoader from "react-content-loader"

const PizzaBlockSkeleton = (props) => (
    <div className="pizza-block-wrapper">
        <ContentLoader
            className="pizza-block"
            speed={0.4}
            width={280}
            height={465}
            viewBox="0 0 280 465"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="286" y="499" rx="0" ry="0" width="1" height="0" />
            <circle cx="139" cy="125" r="125" />
            <rect x="0" y="265" rx="11" ry="11" width="280" height="21" />
            <rect x="0" y="310" rx="11" ry="11" width="280" height="80" />
            <rect x="133" y="412" rx="21" ry="21" width="147" height="42" />
            <rect x="0" y="412" rx="21" ry="21" width="90" height="42" />
        </ContentLoader>
    </div>
)

export default PizzaBlockSkeleton