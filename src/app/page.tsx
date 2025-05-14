"use client"
import {Title} from "@/components/shared/title";
import {Filters} from "@/components/shared/filters";
import {ShowList} from "@/components/shared/show-list"
import {useShowStore} from "@/stores/show";
import {useEffect} from "react";
export default function Home() {

  return (
    <>
     <Title>Checkout these amazing concerts in Graz.</Title>
      <Filters/>
      <ShowList/>
    </>
  );
}