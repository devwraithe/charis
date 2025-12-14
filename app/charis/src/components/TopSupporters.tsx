// import { useCreatorStats } from "@/hooks/useCreatorStats";
// import TopSupporterCard from "./TopSupporterCard";

// function TopSupporters() {
//     const { statistics } = useCreatorStats();

//     const topSupporters = statistics?.topSupporters ?? [
//         { id: 1, name: "CryptoWhale", amount: "125.5 USDC", totalTips: 45, avatar: "🐋", rank: 1 },
//         { id: 2, name: "ArtLover2024", amount: "98.2 USDC", totalTips: 38, avatar: "🎨", rank: 2 },
//         { id: 3, name: "MusicFan", amount: "87.0 USDC", totalTips: 52, avatar: "🎵", rank: 3 },
//         { id: 4, name: "TechEnthusiast", amount: "76.5 USDC", totalTips: 29, avatar: "💻", rank: 4 },
//         { id: 5, name: "GameMaster", amount: "65.8 USDC", totalTips: 41, avatar: "🎮", rank: 5 },
//         { id: 6, name: "StreamSupporter", amount: "54.3 USDC", totalTips: 33, avatar: "📺", rank: 6 },
//         { id: 7, name: "PodcastListener", amount: "48.7 USDC", totalTips: 27, avatar: "🎙️", rank: 7 },
//         { id: 8, name: "ContentKing", amount: "42.1 USDC", totalTips: 19, avatar: "👑", rank: 8 },
//         { id: 9, name: "DigitalNomad", amount: "38.9 USDC", totalTips: 25, avatar: "✈️", rank: 9 },
//         { id: 10, name: "CreatorFan", amount: "35.2 USDC", totalTips: 22, avatar: "⭐", rank: 10 },
//     ];

//     return (
//         <div className="flex flex-col bg-card border rounded-xl py-4 px-5 flex-1">
//             <div className="space-y-3">
//                 {topSupporters.map((supporter) => (
//                     <TopSupporterCard supporter={supporter} />
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default TopSupporters;