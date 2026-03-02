import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function NewsCard() {
  return (
    <Card className="overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
      <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <span className="text-6xl">📰</span>
      </div>
      <CardHeader>
        <div className="flex items-center justify-end mb-2">
          {/* <span className="text-sm font-semibold text-blue-600 uppercase">
            BOB Corp.
          </span> */}
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <span>2 Hours ago</span>
          </div>
        </div>
        <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors">
          BOB News
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum quod
          enim, accusantium vero cumque adipisci nobis! Magnam, nihil, cumque
          nesciunt consequatur consectetur officia nobis voluptate impedit amet
          laborum assumenda reprehenderit.
        </CardDescription>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground truncate">By Bob</span>
      </CardFooter>
    </Card>
  );
}
