"use client";
import { useState, useEffect } from "react";
import { useCellar } from "./CellarProvider";
import { Icon } from "./Icon";
import styles from "@/app/products/[id]/page.module.css";
export function ProductPurchase({ id, name }: { id: string; name: string }) {
  const { add } = useCellar(); const [quantity,setQuantity] = useState(1); const [added,setAdded] = useState(false);
  useEffect(() => { if (!added) return; const timeout=setTimeout(()=>setAdded(false),2000); return ()=>clearTimeout(timeout); },[added]);
  return <div className={styles.purchase}><label className="sr-only" htmlFor="product-quantity">Quantity</label><select id="product-quantity" value={quantity} onChange={e=>setQuantity(Number(e.target.value))}>{[1,2,3,4,5,6,7,8,9,10,11,12].map(n=><option key={n} value={n}>{n}</option>)}</select><button className="btn" aria-label={`Add ${quantity} ${name} to bag`} onClick={()=>{for(let i=0;i<quantity;i++)add(id);setAdded(true);}}>{added ? `Added ${quantity} to your bag` : "Add to bag"}<Icon name="plus" width="18" /></button></div>;
}
