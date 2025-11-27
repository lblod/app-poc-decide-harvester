(in-package :mu-cl-resources)



(defparameter *cache-count-queries* nil)
(defparameter *supply-cache-headers-p* t
  "when non-nil, cache headers are supplied.  this works together with mu-cache.")
(setf *cache-model-properties-p* t)
(defparameter *include-count-in-paginated-responses* t
  "when non-nil, all paginated listings will contain the number
   of responses in the result object's meta.")
(defparameter *max-group-sorted-properties* t)
(defparameter sparql:*experimental-no-application-graph-for-sudo-select-queries* t)

(read-domain-file "auth.json")
(read-domain-file "file.json")
(read-domain-file "job.json")
(read-domain-file "log.json")
(read-domain-file "report.json")
(read-domain-file "harvest.json")
(read-domain-file "domain.json")
