"use client"

import Script from "next/script";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import mixpanel from "mixpanel-browser";

import { usePathname } from 'next/navigation';

export default function MixpanelAnalytics() {

  useEffect(() => {

    mixpanel.init("13746b390c813a2cec8e6030769ad9fd", {
      // debug: true,
      // track_pageview: true,
      persistence: 'localStorage',
      api_host: "/mp",
    })

    // mixpanel.track_links("a", "click link", {
    //   "referrer": document.referrer
    // });

  }, [])

  const pathname = usePathname();

  useEffect(() => {
    mixpanel.track_pageview();
  }, [pathname]);

  return (
    <>
    </>
  )
}