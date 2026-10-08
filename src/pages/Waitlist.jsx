// import { useState } from "react";
// import { Pill, SprayCan, Tag } from "lucide-react";
// import profile from "../assets/img/profile.jpg";
// import profile1 from "../assets/img/profile1.jpg";
// import profile2 from "../assets/img/profile2.jpg";
// import logo from "../assets/img/logo-waitlist.png";
// import scanimg from "../assets/img/88e2061e8c09ff06d3ab40f1ab5ef599fd71c708.png";
// import faceless from "../assets/img/65833875ecbe535ae27f441f6a65320cc29d8d99.jpg";
// import waitlistimg from "../assets/img/mdi_lotion-outline.png";
// import waitlistimg1 from "../assets/img/streamline-pixel_health-drug-medicine.png";
// import { Link } from "react-router-dom";
// import ScanVisual from "../components/sections/ScanVisual";

// const MAILCHIMP_ACTION_URL = "https://gmail.us12.list-manage.com/subscribe/post?u=d5debeb66502aa4fb39c1c5c2&id=40b779e4b4&f_id=0039fae0f0";
// const MAILCHIMP_HONEYPOT_NAME = "b_d5debeb66502aa4fb39c1c5c2_40b779e4b4";

// // function InfoGrid({ className = "" }) {
// //   const cell = "flex items-center justify-center gap-3 px-10 py-6 text-2xl";
// //   const divider = { borderColor: "var(--border)" };
// //   return (
// //     <div className={`grid grid-cols-2 ${className}`}>
// //       <div className={`${cell} border-r border-b pharmawaitlist`} style={{ color: "var(--whiteblack1111)", ...divider }}>
// //         <img src={waitlistimg1} alt="Mantios" /> Pharma
// //       </div>
// //       <div className={`${cell} border-b pharmawaitlist1`} style={{ color: "var(--whiteblack1111)", ...divider }}>
// //         <img src={waitlistimg} alt="Mantios" />  Beauty
// //       </div>
// //       <div className={`${cell} border-r vendorwaitlist`} style={{ color: "var(--vendortxtnumberfff)", ...divider }}>
// //         Vendor Network
// //       </div>
// //       <div className={`${cell} vendorwaitlist`} style={{ color: "var(--vendortxtnumberfff)" }}>
// //         Trusted verification
// //       </div>
// //     </div>
// //   );
// // }
// function InfoGrid({ className = "" }) {
//   const cell =
//     "flex h-[48px] items-center justify-center gap-3 px-4 text-[15px]";

//   const divider = {
//     borderColor: "var(--border)",
//   };

//   return (
//     <div className={`grid w-full grid-cols-2 ${className}`}>
//       {/* Pharma */}
//       <div
//         className={`${cell} border-r border-b`}
//         style={{
//           color: "var(--whiteblack1111)",
//           ...divider,
//         }}
//       >
//         <img
//           src={waitlistimg1}
//           alt=""
//           className="h-4 w-4 object-contain"
//         />
//         <span>Pharma</span>
//       </div>

//       {/* Beauty */}
//       <div
//         className={`${cell} border-b`}
//         style={{
//           color: "var(--whiteblack1111)",
//           ...divider,
//         }}
//       >
//         <img
//           src={waitlistimg}
//           alt=""
//           className="h-4 w-4 object-contain"
//         />
//         <span>Beauty</span>
//       </div>

//       {/* Vendor Network */}
//       <div
//         className={`${cell} border-r`}
//         style={{
//           color: "var(--vendortxtnumberfff)",
//           ...divider,
//         }}
//       >
//         <span>Vendor Network</span>
//       </div>

//       {/* Trusted verification */}
//       <div
//         className={cell}
//         style={{
//           color: "var(--vendortxtnumberfff)",
//         }}
//       >
//         <span>Trusted verification</span>
//       </div>
//     </div>
//   );
// }

// function ProductFrame() {
//   return (
//     <div className="relative w-[220px] h-[260px] mx-auto ">
//       {/* corner brackets */}
//       <span className="absolute -top-4 -left-4 w-6 h-6 border-t border-l" style={{ borderColor: "var(--border)" }} />
//       <span className="absolute -top-4 -right-4 w-6 h-6 border-t border-r" style={{ borderColor: "var(--border)" }} />
//       <span className="absolute -bottom-4 -left-4 w-6 h-6 border-b border-l" style={{ borderColor: "var(--border)" }} />
//       <span className="absolute -bottom-4 -right-4 w-6 h-6 border-b border-r" style={{ borderColor: "var(--border)" }} />

//       {/* dashed scan line */}
//       <span className="absolute left-[-30px] right-[-30px] top-1/2 border-t border-dashed " style={{ borderColor: "var(--dotcolor)" }} />

//       {/* product mockup */}
//       <div className="absolute inset-x-8 bottom-0 top-6 rounded-t-md rounded-b-sm bg-gradient-to-b from-violet-700 to-violet-900 flex flex-col items-center pt-6 text-center shadow-lg">
//         <span className="text-white/90 text-xs tracking-widest">BRAND</span>
//         <span className="text-white/50 text-[10px] mt-1">BODY LOTION</span>
//         <span className="text-white/30 text-[9px] mt-auto mb-3">100 ml / 3.4 fl.oz.</span>
//         <div className="w-full h-8 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-b-sm" />
//       </div>
//     </div>
//   );
// }

// export default function WaitlistSection() {
//   const [email, setEmail] = useState("");
//   const [status, setStatus] = useState("idle"); // idle | loading | success

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!email) return;
//     setStatus("loading");
//     e.target.target = "mc-hidden-iframe";
//     e.target.submit();
//     setTimeout(() => setStatus("success"), 600);
//   };

//   return (
//     <section
//       className="min-h-screen flex flex-col items-center px-6 pt-24 text-center transition-colors waitlistborderroundwidpadding"
//       style={{ background: "var(--background)", color: "var(--foreground)" }}
//     >
//       {/* nav */}
//       <nav className="fixed top-0 left-0 right-0 flex items-center justify-between px-10 py-5">
//         <div className="flex items-center gap-2 font-medium" style={{ color: "var(--logocolor)" }}>
//           <span className="w-4 h-4 rounded-sm rotate-45 inline-block" style={{ background: "var(--dotcolor)" }} />
//           Mantios
//         </div>
//         <div className="flex gap-8 text-sm">
//           <span style={{ color: "var(--link)" }} className="hover:[color:var(--linkhover)] transition-colors">About</span>
//           <span style={{ color: "var(--link)" }} className="hover:[color:var(--linkhover)] transition-colors">Features</span>
//         </div>
//       </nav>

//       <div
//         className="mb-6 flex items-center gap-2 rounded-full border px-4 py-2 text-sm"
//         style={{
//           borderColor: "var(--colorpointscanknowborder)",
//           background: "var(--colorpointscanknowborder)",
//           color: "var(---colortxtpointscanknowborder)",
//         }}
//       >
//         <div className="flex -space-x-2">
//             {[profile, profile1, profile2].map((src, i) => (
//               <span
//                 key={i}
//                 className="h-7 w-7 overflow-hidden rounded-full border-2 border-white dark:border-neutral-900 joinuswaitlistt"
//               >
//                 <img
//                   src={src}
//                   alt={`User ${i + 1}`}
//                   className="h-full w-full object-cover"
//                 />
//               </span>
//             ))}
//           </div>
                  
//         Join over 500+ people today
//       </div>

//       {status === "success" ? (
//         <>
//           <h1 className="text-4xl md:text-6xl font-medium leading-tight thanksforjointxt" style={{ color: "var(--h1color)" }}>
//             Thank you for joining the{" "}<br/>
//             <span style={{ color: "var(--dotcolor)" }}>Mantios</span> waitlist
//           </h1>
//           <p className="mt-4 thanksforjointxtemail">
//             Your email has been added to the waitlist successfully,
//           </p>

//           {/* success graphic: dashed circle containing analyzing + grid */}
//          <div
//             className="relative mt-20 w-[300px] h-[300px] rounded-full border border-dashed flex flex-col items-center justify-center gap-4 waitlistborderroundwid"
//             style={{ borderColor: "var(--dotcolor)" }}
//           >
            
//             {/* Small logo on the top-left of circle */}
//             <span
//               className="absolute top-[6%] left-[6%] w-7 h-7 rounded-full flex items-center justify-center z-10 wailisttop3point2"
              
//             >
//               <img
//                 size={14}
//                 className=""
//                 src={logo}
//               />
//             </span>

//             <span className="text-sm analyze">Analyzing......</span>

//             <InfoGrid />
//           </div>
//         </>
//       ) : (
//         <>
//           <h1 className="text-4xl md:text-6xl font-medium leading-tight max-w-3xl" style={{ color: "var(--h1color)" }}>
//             Verify authenticity of your products with{" "}
//             <span style={{ color: "var(--dotcolor)" }}>Mantios</span>
//           </h1>
//           <p className="mt-4" style={{ color: "var(--p1color)" }}>
//             Be a part of the movement, protect your health and your money
//           </p>

//           <form
//             onSubmit={handleSubmit}
//             action={MAILCHIMP_ACTION_URL}
//             method="POST"
//             noValidate
//             className="mt-8 flex w-full max-w-md flex-col sm:flex-row gap-3"
//           >
//             <input
//               type="email"
//               name="EMAIL"
//               required
//               placeholder="Enter your email address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="flex-1 rounded-full border px-5 py-3 outline-none focus:[border-color:var(--dotcolor)]"
//               style={{
//                 borderColor: "var(--border)",
//                 background: "var(--borderfieldboardbg)",
//                 color: "var(--foreground)",
//               }}
//             />
//             <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
//               <input type="text" name={MAILCHIMP_HONEYPOT_NAME} tabIndex="-1" defaultValue="" />
//             </div>
//             <button
//               type="submit"
//               disabled={status === "loading"}
//               className="rounded-full px-6 py-3 font-medium disabled:opacity-60 primarybutton"
              
//             >
//              <span>{status === "loading" ? "Joining..." : "Join the waitlist"}</span>
//             </button>
//           </form>

//           {/* form-state graphic: frame + tube, analyzing/grid offset to the right */}
//           {/* <div className="relative mt-16 flex items-end gap-16 ">
//             <ScanVisual />
//             <div className="flex flex-col items-start gap-3 pb-2">
//               <span className="text-sm analyze">Analyzing......</span>
//               <InfoGrid />
//             </div>
//           </div> */}
//           <div className="relative mt-16 flex w-full max-w-[1200px] flex-col items-center justify-center md:flex-row margwatilisttp margwatilisttpn">
  
//             {/* Product scanner - Always centered */}
//             <div className="md:absolute md:left-1/2 md:-translate-x-1/2">
//               <ScanVisual />
//             </div>

//             {/* Analysis information - stays beside it */}
//             <div className="flex w-[300px] flex-col items-start pb-2 md:ml-auto margwatilisttpn">

//               <span className="analyze mb-8 text-[11px] font-medium margwatilisttpnnn">
//                 Analyzing......
//               </span>

//               <InfoGrid />

//             </div>

//           </div>
//         </>
//       )}

//       <iframe name="mc-hidden-iframe" style={{ display: "none" }} title="mailchimp" />
//     </section>
//   );
// }



import { useState } from "react";
import { Pill, SprayCan, Tag } from "lucide-react";
import profile from "../assets/img/profile.jpg";
import profile1 from "../assets/img/profile1.jpg";
import profile2 from "../assets/img/profile2.jpg";
import logo from "../assets/img/logo-waitlist.png";
import scanimg from "../assets/img/88e2061e8c09ff06d3ab40f1ab5ef599fd71c708.png";
import faceless from "../assets/img/65833875ecbe535ae27f441f6a65320cc29d8d99.jpg";
import waitlistimg from "../assets/img/mdi_lotion-outline.png";
import waitlistimg1 from "../assets/img/streamline-pixel_health-drug-medicine.png";
import { Link } from "react-router-dom";
import ScanVisual from "../components/sections/ScanVisual";
import { supabase } from "../lib/supabase";

function InfoGrid({ className = "" }) {
  const cell =
    "flex h-[48px] items-center justify-center gap-3 px-4 text-[15px]";

  const divider = {
    borderColor: "var(--border)",
  };

  return (
    <div className={`grid w-full grid-cols-2 ${className}`}>
      {/* Pharma */}
      <div
        className={`${cell} border-r border-b`}
        style={{
          color: "var(--whiteblack1111)",
          ...divider,
        }}
      >
        <img
          src={waitlistimg1}
          alt=""
          className="h-4 w-4 object-contain"
        />
        <span>Pharma</span>
      </div>

      {/* Beauty */}
      <div
        className={`${cell} border-b`}
        style={{
          color: "var(--whiteblack1111)",
          ...divider,
        }}
      >
        <img
          src={waitlistimg}
          alt=""
          className="h-4 w-4 object-contain"
        />
        <span>Beauty</span>
      </div>

      {/* Vendor Network */}
      <div
        className={`${cell} border-r`}
        style={{
          color: "var(--vendortxtnumberfff)",
          ...divider,
        }}
      >
        <span>Vendor Network</span>
      </div>

      {/* Trusted verification */}
      <div
        className={cell}
        style={{
          color: "var(--vendortxtnumberfff)",
        }}
      >
        <span>Trusted verification</span>
      </div>
    </div>
  );
}

function ProductFrame() {
  return (
    <div className="relative w-[220px] h-[260px] mx-auto ">
      {/* corner brackets */}
      <span className="absolute -top-4 -left-4 w-6 h-6 border-t border-l" style={{ borderColor: "var(--border)" }} />
      <span className="absolute -top-4 -right-4 w-6 h-6 border-t border-r" style={{ borderColor: "var(--border)" }} />
      <span className="absolute -bottom-4 -left-4 w-6 h-6 border-b border-l" style={{ borderColor: "var(--border)" }} />
      <span className="absolute -bottom-4 -right-4 w-6 h-6 border-b border-r" style={{ borderColor: "var(--border)" }} />

      {/* dashed scan line */}
      <span className="absolute left-[-30px] right-[-30px] top-1/2 border-t border-dashed " style={{ borderColor: "var(--dotcolor)" }} />

      {/* product mockup */}
      <div className="absolute inset-x-8 bottom-0 top-6 rounded-t-md rounded-b-sm bg-gradient-to-b from-violet-700 to-violet-900 flex flex-col items-center pt-6 text-center shadow-lg">
        <span className="text-white/90 text-xs tracking-widest">BRAND</span>
        <span className="text-white/50 text-[10px] mt-1">BODY LOTION</span>
        <span className="text-white/30 text-[9px] mt-auto mb-3">100 ml / 3.4 fl.oz.</span>
        <div className="w-full h-8 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-b-sm" />
      </div>
    </div>
  );
}

export default function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success
  const [error, setError] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!email) return;
  setStatus("loading");
  setError("");

  const { data, error } = await supabase.functions.invoke("join-waitlist", {
    body: { email },
  });

  if (error) {
    setStatus("idle");
    setError("Something went wrong. Please try again.");
    return;
  }

  if (data?.duplicate) {
    setStatus("idle");
    setError("This email is already on the waitlist.");
    return;
  }

  setStatus("success");
};

  return (
    <section
      className="min-h-screen flex flex-col items-center px-6 pt-24 text-center transition-colors waitlistborderroundwidpadding"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* nav */}
      <nav className="fixed top-0 left-0 right-0 flex items-center justify-between px-10 py-5">
        <div className="flex items-center gap-2 font-medium" style={{ color: "var(--logocolor)" }}>
          <span className="w-4 h-4 rounded-sm rotate-45 inline-block" style={{ background: "var(--dotcolor)" }} />
          Mantios
        </div>
        <div className="flex gap-8 text-sm">
          <span style={{ color: "var(--link)" }} className="hover:[color:var(--linkhover)] transition-colors">About</span>
          <span style={{ color: "var(--link)" }} className="hover:[color:var(--linkhover)] transition-colors">Features</span>
        </div>
      </nav>

      <div
        className="mb-6 flex items-center gap-2 rounded-full border px-4 py-2 text-sm"
        style={{
          borderColor: "var(--colorpointscanknowborder)",
          background: "var(--colorpointscanknowborder)",
          color: "var(---colortxtpointscanknowborder)",
        }}
      >
        <div className="flex -space-x-2">
          {[profile, profile1, profile2].map((src, i) => (
            <span
              key={i}
              className="h-7 w-7 overflow-hidden rounded-full border-2 border-white dark:border-neutral-900 joinuswaitlistt"
            >
              <img
                src={src}
                alt={`User ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </span>
          ))}
        </div>

        Join over 500+ people today
      </div>

      {status === "success" ? (
        <>
          <h1 className="text-4xl md:text-6xl font-medium leading-tight thanksforjointxt" style={{ color: "var(--h1color)" }}>
            Thank you for joining the{" "}<br />
            <span style={{ color: "var(--dotcolor)" }}>Mantios</span> waitlist
          </h1>
          <p className="mt-4 thanksforjointxtemail">
            Your email has been added to the waitlist successfully,
          </p>

          {/* success graphic: dashed circle containing analyzing + grid */}
          <div
            className="relative mt-20 w-[300px] h-[300px] rounded-full border border-dashed flex flex-col items-center justify-center gap-4 waitlistborderroundwid"
            style={{ borderColor: "var(--dotcolor)" }}
          >

            {/* Small logo on the top-left of circle */}
            <span
              className="absolute top-[6%] left-[6%] w-7 h-7 rounded-full flex items-center justify-center z-10 wailisttop3point2"
            >
              <img
                size={14}
                className=""
                src={logo}
              />
            </span>

            <span className="text-sm analyze">Analyzing......</span>

            <InfoGrid />
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl md:text-6xl font-medium leading-tight max-w-3xl" style={{ color: "var(--h1color)" }}>
            Verify authenticity of your products with{" "}
            <span style={{ color: "var(--dotcolor)" }}>Mantios</span>
          </h1>
          <p className="mt-4" style={{ color: "var(--p1color)" }}>
            Be a part of the movement, protect your health and your money
          </p>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-8 flex w-full max-w-md flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              name="EMAIL"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-full border px-5 py-3 outline-none focus:[border-color:var(--dotcolor)]"
              style={{
                borderColor: "var(--border)",
                background: "var(--borderfieldboardbg)",
                color: "var(--foreground)",
              }}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-full px-6 py-3 font-medium disabled:opacity-60 primarybutton"
            >
              <span>{status === "loading" ? "Joining..." : "Join the waitlist"}</span>
            </button>
          </form>
          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

          <div className="relative mt-16 flex w-full max-w-[1200px] flex-col items-center justify-center md:flex-row margwatilisttp margwatilisttpn">

            {/* Product scanner - Always centered */}
            <div className="md:absolute md:left-1/2 md:-translate-x-1/2">
              <ScanVisual />
            </div>

            {/* Analysis information - stays beside it */}
            <div className="flex w-[300px] flex-col items-start pb-2 md:ml-auto margwatilisttpn">

              <span className="analyze mb-8 text-[11px] font-medium margwatilisttpnnn">
                Analyzing......
              </span>

              <InfoGrid />

            </div>

          </div>
        </>
      )}
    </section>
  );
}