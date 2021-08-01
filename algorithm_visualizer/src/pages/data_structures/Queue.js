/*

Queue.js

A function to represent a queue

Created by Kate Morley - http://code.iamkate.com/ - and released under the terms
of the CC0 1.0 Universal legal code:

http://creativecommons.org/publicdomain/zero/1.0/legalcode

*/

/* Creates a new queue. A queue is a first-in-first-out (FIFO) data structure -
 * items are added to the end of the queue and removed from the front.
 */
export class Queue {
    constructor() {
        this._queue = [];
        this._offset = 0;

    }
  
    // Returns the length of the queue.
    getLength(){
      return (this._queue.length - this._offset);
    }
  
    // Returns true if the queue is empty, and false otherwise.
    isEmpty(){
      return (this._queue.length === 0);
    }
  
    /* Enqueues the specified item. The parameter is:
     *
     * item - the item to enqueue
     */
    enqueue(item){
      this._queue.push(item);
    }
  
    /* Dequeues an item and returns it. If the queue is empty, the value
     * 'undefined' is returned.
     */
    dequeue(){
  
      // if the queue is empty, return immediately
      if (this._queue.length === 0) return undefined;
  
      // store the item at the front of the queue
      var item = this._queue[this._offset];
  
      // increment the offset and remove the free space if necessary
      if (++ this._offset * 2 >= this._queue.length){
        this._queue  = this._queue.slice(this._offset);
        this._offset = 0;
      }
  
      // return the dequeued item
      return item;
  
    }
  
    /* Returns the item at the front of the queue (without dequeuing it). If the
     * queue is empty then undefined is returned.
     */
    peek() {
      return (this._queue.length > 0 ? this._queue[this._offset] : undefined);
    }
  
  }
  