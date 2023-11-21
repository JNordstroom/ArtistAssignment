namespace webApi.Entities
{
    public class Album
    {
        public int Id {get; set;}
        public string Namn {get; set;}
        public int Publicerad {get; set;}
        public int Artisterid {get; set;}
        
        public Artister Artist { get; set; }
    }
}