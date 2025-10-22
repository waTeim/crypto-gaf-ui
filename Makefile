MAKE_ENV ?= make.env
ifneq (,$(wildcard $(MAKE_ENV)))
include $(MAKE_ENV)
export
endif

REGISTRY ?= localhost
IMAGE_NAME ?= crypto-gaf-ui
TAG ?= latest
PLATFORM ?= linux/amd64
IMAGE ?= $(REGISTRY)/$(IMAGE_NAME):$(TAG)

.PHONY: build push

build:
	@echo "Building $(IMAGE) for $(PLATFORM)"
	docker build --platform $(PLATFORM) --pull --rm -t $(IMAGE) .

push: build
	@echo "Pushing $(IMAGE)"
	docker push $(IMAGE)
