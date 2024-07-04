export class ParseSourceContent{
    public content: any;

    titles_to_remove = ['See also', 'References', 'Further reading', 'External links', 'Notes and references', 'Bibliography', 'Notes', 'Cited sources'];
    block_types_toremove = ['table','empty_line'];
    constructor(sourceContent:any){
        this.content = sourceContent;
    }

    parseData() {
        // if(this.content.type == 'source') {
            let dataAfterRemovingUnWantedBlocks = this.removeSectionsByTitle(this.content.content);
            let afterSanitized = this.sanitizeBlocks(dataAfterRemovingUnWantedBlocks);
            return {
                type: this.content.type,
                title: this.content.title,
                content: afterSanitized,
                headings: this.content.headings,
                taxonomy: this.content.taxonomy,
            }    
    }

    removeSectionsByTitle(data: Array<any>){
        let dataAfterRemoving = [];
        for(let elem of data){
            if(elem.block_type == 'heading' &&   this.titles_to_remove.includes(elem.content)){
                continue;
            }
            /// remove unwanted blcok types , for now `table` and `empty_line`
            if(this.block_types_toremove.includes(elem.block_type)){
                continue;
            }
            if(elem.children){
                elem.children = this.removeSectionsByTitle(elem.children)
                
            }
            dataAfterRemoving.push(elem)
            
        }
        return dataAfterRemoving;
    }
    
    sanitizeWikiContent(content: String) {
        // Remove newline characters
        content = content.replace(/\\n/g, ' ');
    
        // Remove internal link references, keeping only the link text
        // Pattern explanation: [[link|text|index|wiki]] --> text
        content = content.replace(/\[\[.*?\|(.*?)\|.*?\|wiki\]\]/g, '$1');
    
        // Remove external links, keeping only the link text
        // Pattern explanation: [url text] --> text
        content = content.replace(/\[http[s]?:\/\/[^\s]+ ([^\]]+)\]/g, '$1');
    
        // Remove Markdown link references, keeping only the link text
        // Pattern explanation: ![link text](url) --> link text
        content = content.replace(/\!\[([^\]]+)\]\([^\)]+\)/g, '$1');
    
        return content;
    }

    sanitizeBlocks(blocks: Array<any>) {
        let sanitizedBlocks = <any>[] ;
        blocks = blocks.filter((item)=> item.block_type != 'table');
        blocks.forEach(block => {

            let sanitizedBlock: any = {};
            for (let key in block) {
                let value = block[key];
                if (typeof value === 'string') {
                    sanitizedBlock[key] = this.sanitizeWikiContent(value);
                } else if (Array.isArray(value)) {
                    sanitizedBlock[key] = this.sanitizeBlocks(value);
                } else {
                    sanitizedBlock[key] = value;
                }
            }
            sanitizedBlocks.push(sanitizedBlock);
        });
        return sanitizedBlocks;
    }
    
    
}