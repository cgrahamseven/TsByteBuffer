/// <reference path="./lib/node.d.ts" />
/// <reference path="./lib/ref.d.ts" />
import ref = require('ref');

export enum ByteOrder {
    LITTLE_ENDIAN,
    BIG_ENDIAN
}

export class ByteBuffer {
    private _buffer: Buffer;
    private _byteOrder: ByteOrder;
    private _rpos = 0; // Read position
    private _wpos = 0; // Write position
    
    constructor(byteOrder: ByteOrder, buffer?: Buffer, buffSize?: number) {
        this._byteOrder = byteOrder;
        if(buffer) this._buffer = buffer;
        else this._buffer = (buffSize) ? new Buffer(buffSize) : new Buffer(1024);
    }
    
    public data(): Buffer {
        return this._buffer;
    }
    public size(): number {
        return this._buffer.length;
    }
    // Read methods
    public get(index?: number): number {
        let data: number = (index) ? this._buffer.readUInt8(index) : 
            this._buffer.readUInt8(this._rpos);
        this._rpos += 1;
        return data;
    }
    public getBytes(len: number): Buffer {
        let data: Buffer = this._buffer.slice(this._rpos, this._rpos + len);
        this._rpos += len;
        return data;
    }
    public getChar(index?: number): number {
        let data: number = (index) ? this._buffer.readUInt8(index) : 
            this._buffer.readUInt8(this._rpos);
        this._rpos += 1;
        return data;
    }
    public getDouble(index?: number): number {
        let data: number = 0;
        switch(this._byteOrder) {
            case ByteOrder.LITTLE_ENDIAN:
                data = (index) ? this._buffer.readDoubleLE(index) : 
                    this._buffer.readDoubleBE(this._rpos);
                if(!index) this._rpos += 8;
                break;
            case ByteOrder.BIG_ENDIAN:
                data = (index) ? this._buffer.readDoubleBE(index) : 
                    this._buffer.readDoubleLE(this._rpos);
                if(!index) this._rpos += 8;
                break;
            default:
                break;
        }
        return data;
    }
    public getInt(index?: number): number {
        let data: number = 0;
        switch(this._byteOrder) {
            case ByteOrder.LITTLE_ENDIAN:
                data = (index) ? this._buffer.readInt32LE(index) : 
                    this._buffer.readInt32LE(this._rpos);
                if(!index) this._rpos += 4;
                break;
            case ByteOrder.BIG_ENDIAN:
                data = (index) ? this._buffer.readInt32BE(index) : 
                    this._buffer.readInt32BE(this._rpos);
                if(!index) this._rpos += 4;
                break;
            default:
                break;
        }
        return data;
    }
    public getInt64(index?: number): any {
        let data: any;
        switch(this._byteOrder) {
            case ByteOrder.LITTLE_ENDIAN:
                data = (index) ? ref.readInt64LE(this._buffer, index) :
                    ref.readInt64LE(this._buffer, this._rpos);
                if(!index) this._rpos += 8;
                break;
            case ByteOrder.BIG_ENDIAN:
                data = (index) ? ref.readInt64BE(this._buffer, index) : 
                    ref.readInt64BE(this._buffer, this._rpos);
                if(!index) this._rpos += 8;
                break;
            default:
                data = 0;
                break;
        }
        return data;
    }
    public getShort(index?: number): number {
        let data: number = 0;
        switch(this._byteOrder) {
            case ByteOrder.LITTLE_ENDIAN:
                data = (index) ? this._buffer.readInt16LE(index) : 
                    this._buffer.readInt16LE(this._rpos);
                if(!index) this._rpos += 2;
                break;
            case ByteOrder.BIG_ENDIAN:
                data = (index) ? this._buffer.readInt16BE(index) : 
                    this._buffer.readInt16BE(this._rpos);
                if(!index) this._rpos += 2;
                break;
            default:
                break;
        }
        return data;
    }
    public getUInt(index?: number): number {
        let data: number = 0;
        switch(this._byteOrder) {
            case ByteOrder.LITTLE_ENDIAN:
                data = (index) ? this._buffer.readUInt32LE(index) : 
                    this._buffer.readUInt32LE(this._rpos);
                if(!index) this._rpos += 4;
                break;
            case ByteOrder.BIG_ENDIAN:
                data = (index) ? this._buffer.readUInt32BE(index) : 
                    this._buffer.readUInt32BE(this._rpos);
                if(!index) this._rpos += 4;
                break;
            default:
                break;
        }
        return data;
    }
    public getUInt64(index?: number): any {
        let data: any;
        switch(this._byteOrder) {
            case ByteOrder.LITTLE_ENDIAN:
                data = (index) ? ref.readUInt64LE(this._buffer, index) : 
                    ref.readUInt64LE(this._buffer, this._rpos);
                if(!index) this._rpos += 8;
                break;
            case ByteOrder.BIG_ENDIAN:
                data = (index) ? ref.readUInt64BE(this._buffer, index) : 
                    ref.readUInt64BE(this._buffer, this._rpos);
                if(!index) this._rpos += 8;
                break;
            default:
                data = 0;
                break;
        }
        return data;
    }
    public getUShort(index?: number): number {
        let data: number = 0;
        switch(this._byteOrder) {
            case ByteOrder.LITTLE_ENDIAN:
                data = (index) ? this._buffer.readUInt16LE(index) : 
                    this._buffer.readUInt16LE(this._rpos);
                if(!index) this._rpos += 2;
                break;
            case ByteOrder.BIG_ENDIAN:
                data = (index) ? this._buffer.readUInt16BE(index) :
                    this._buffer.readUInt16BE(this._rpos);
                if(!index) this._rpos += 2;
                break;
            default:
                break;
        }
        return data;
    }
    // Write methods
    public put(value: number, index?: number): void {
        if(index) 
            this._buffer.writeUInt8(value, index);
        else {
            this._buffer.writeUInt8(value, this._wpos);
            this._wpos += 1;
        }
    }
    public putBytes(data: string, index?: number): void {
        if(index)
            this._buffer.write(data, index);
        else {
            this._buffer.write(data, this._wpos);
            this._wpos += data.length;
        }
    }
    public putChar(value: number, index?: number): void {
        if(index)
            this._buffer.writeUInt8(value, index);
        else {
            this._buffer.writeUInt8(value, this._wpos);
            this._wpos += 1;
        }
    }
    public putDouble(value: number, index?: number): void {
        switch(this._byteOrder) {
            case ByteOrder.LITTLE_ENDIAN:
                if(index)
                    this._buffer.writeDoubleLE(value, index);
                else {
                    this._buffer.writeDoubleLE(value, this._wpos);
                    this._wpos += 8;
                }
                break;
            case ByteOrder.BIG_ENDIAN:
                if(index)
                    this._buffer.writeDoubleBE(value, index);
                else {
                    this._buffer.writeDoubleBE(value, this._wpos);
                    this._wpos += 8;
                }
                break;
            default:
                break;
        }
    }
    public putInt(value: number, index?: number): void {
        switch(this._byteOrder) {
            case ByteOrder.LITTLE_ENDIAN:
                if(index)
                    this._buffer.writeInt32LE(value, index);
                else {
                    this._buffer.writeInt32LE(value, this._wpos);
                    this._wpos += 4;
                }
                break;
            case ByteOrder.BIG_ENDIAN:
                if(index)
                    this._buffer.writeInt32BE(value, index);
                else {
                    this._buffer.writeInt32BE(value, this._wpos);
                    this._wpos += 4;
                }
                break;
            default:
                break;
        }
    }
    public putInt64(value: number, index?: number): void {
        switch(this._byteOrder) {
            case ByteOrder.LITTLE_ENDIAN:
                if(index)
                    ref.writeInt64LE(this._buffer, index, value);
                else {
                    ref.writeInt64LE(this._buffer, this._wpos, value);
                    this._wpos += 8;
                }
                break;
            case ByteOrder.BIG_ENDIAN:
                if(index)
                    ref.writeInt64BE(this._buffer, index, value);
                else {
                    ref.writeInt64BE(this._buffer, this._wpos, value);
                    this._wpos += 8;
                }
                break;
            default:
                break;
        }
    }
    public putShort(value: number, index?: number): void {
        switch(this._byteOrder) {
            case ByteOrder.LITTLE_ENDIAN:
                if(index)
                    this._buffer.writeInt16LE(value, index);
                else {
                    this._buffer.writeInt16LE(value, this._wpos);
                    this._wpos += 2;
                }
                break;
            case ByteOrder.BIG_ENDIAN:
                if(index)
                    this._buffer.writeInt16BE(value, index);
                else {
                    this._buffer.writeInt16BE(value, this._wpos);
                    this._wpos += 2;
                }
                break;
            default:
                break;
        }
    }
    public putUInt(value: number, index?: number): void {
        switch(this._byteOrder) {
            case ByteOrder.LITTLE_ENDIAN:
                if(index)
                    this._buffer.writeUInt32LE(value, index);
                else {
                    this._buffer.writeUInt32LE(value, this._wpos);
                    this._wpos += 4;
                }
                break;
            case ByteOrder.BIG_ENDIAN:
                if(index)
                    this._buffer.writeUInt32BE(value, index);
                else {
                    this._buffer.writeUInt32BE(value, this._wpos);
                    this._wpos += 4;
                }
                break;
            default:
                break;
        }
    }
    public putUInt64(value: number, index?: number): void {
        switch(this._byteOrder) {
            case ByteOrder.LITTLE_ENDIAN:
                if(index)
                    ref.writeUInt64LE(this._buffer, index, value);
                else {
                    ref.writeUInt64LE(this._buffer, this._wpos, value);
                    this._wpos += 8;
                }
                break;
            case ByteOrder.BIG_ENDIAN:
                if(index)
                    ref.writeUInt64BE(this._buffer, index, value);
                else {
                    ref.writeUInt64BE(this._buffer, this._wpos, value);
                    this._wpos += 8;
                }
                break;
            default:
                break;
        }
    }
    public putUShort(value: number, index?: number): void {
        switch(this._byteOrder) {
            case ByteOrder.LITTLE_ENDIAN:
                if(index)
                    this._buffer.writeUInt16LE(value, index);
                else {
                    this._buffer.writeUInt16LE(value, this._wpos);
                    this._wpos += 2;
                }
                break;
            case ByteOrder.BIG_ENDIAN:
                if(index)
                    this._buffer.writeUInt16BE(value, index);
                else {
                    this._buffer.writeUInt16BE(value, this._wpos);
                    this._wpos += 2;
                }
                break;
            default:
                break;
        }
    }
}