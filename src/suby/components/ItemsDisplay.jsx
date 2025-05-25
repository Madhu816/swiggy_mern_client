import React from 'react'
import { itemData } from '../data'
import { useState } from 'react'


const ItemsDisplay = () => {
    const [displayItems, setDisplayItems] = useState(itemData);
    return (
        <div className="itemSection">
            {displayItems.map((item) => {
                return (
                    <div className="gallery">
                        <img src={item.item_img} alt={item.item_img} />
                    </div>
                )
            })

            }
        </div>
    )
}

export default ItemsDisplay
